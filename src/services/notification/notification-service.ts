import { Constructable, DI, IAurelia, IContainer, IPlatform, Registration } from 'aurelia';
import { ICustomElementController } from '@aurelia/runtime-html';

import { createCustomElement, destroyCustomElement } from '../../aurelia-helpers';
import { IDesignSystemConfiguration } from '../../configuration';
import { KConfirm, KToast } from '../../elements';
import { ToastOptions } from '../../elements/k-toast/toast-options';

export type INotificationService = NotificationService;
export const INotificationService = DI.createInterface<INotificationService>('INotificationService');
export class NotificationService {
  private activeToast?: KToast;

  constructor(
    @IPlatform private readonly platform: IPlatform,
    @IAurelia private readonly aurelia: IAurelia,
    @IContainer private readonly container: IContainer,
    @IDesignSystemConfiguration private readonly config: IDesignSystemConfiguration,
  ) {}

  public async confirm(message?: string, component: Constructable<{ message?: string; confirm: (result?: boolean) => boolean | Promise<boolean> }> = KConfirm): Promise<boolean> {
    return new Promise((res) => {
      const { controller, instance } = createCustomElement(component, this.container, this.aurelia.root.host);

      if (message) {
        instance.message = message;
      }
      const confirm = instance.confirm;
      instance.confirm = async (value): Promise<boolean> => {
        const result = await confirm(value);
        await destroyCustomElement(controller);
        res(result);
        return result;
      };
    });
  }

  /**
   *
   * @param options
   * @returns A function to close the toast with
   */
  public toast(options: ToastOptions | string): Promise<() => void> {
    let toastOptions = options as ToastOptions;
    if (typeof options === 'string') {
      toastOptions = { message: options };
    }

    if (toastOptions.timeOut !== 0) {
      toastOptions.countdown ??= (toastOptions.timeOut ?? this.config.defaultToastTimeout ?? 0) / 1000;
    }

    return new Promise<void>((res) => {
      if (!this.activeToast) res();
      const task = this.platform.taskQueue.queueTask(
        () => {
          if (!this.activeToast) {
            res();
            task.cancel();
          }
        },
        { delay: 100, persistent: true /* runs until canceled */ },
      );
    }).then(() => {
      const { controller, instance } = createCustomElement(KToast, this.container, this.aurelia.root.host, toastOptions);
      instance.close = () => this.destroyToast(controller);
      if (toastOptions.timeOut !== 0 && (toastOptions.timeOut || this.config.defaultToastTimeout)) {
        this.activeToast = instance;
        let timeout = toastOptions.timeOut ?? this.config.defaultToastTimeout;
        const expireTask = this.platform.taskQueue.queueTask(
          () => {
            if (instance.hovering || timeout == null) return;
            timeout -= 1000;
            if (timeout <= 0) {
              expireTask.cancel();
              this.destroyToast(controller);
            }
          },
          { delay: 100, persistent: true /* runs until canceled */ },
        );
      }
      return () => {
        this.destroyToast(controller);
      };
    });
  }

  private destroyToast(controller: ICustomElementController) {
    void destroyCustomElement(controller);
    this.activeToast = undefined;
  }
  public static register(container: IContainer): void {
    Registration.singleton(INotificationService, NotificationService).register(container);
  }
}
