import { IContainer, IRegistry, Registration } from 'aurelia';
import { ValidationHtmlConfiguration, ValidationTrigger } from '@aurelia/validation-html';

import * as attributes from './attributes';
import { IDesignSystemConfiguration } from './configuration';
import * as elements from './elements';
import * as services from './services';
import * as valueConverters from './value-converters';

import './styles/main.scss';

export class BetsyWebComponentsPlugin implements IRegistry {
  #configuration?: IDesignSystemConfiguration;

  public static configure(...args: [config: (config: IDesignSystemConfiguration) => void] | [config: IDesignSystemConfiguration]): BetsyWebComponentsPlugin {
    const instance = new BetsyWebComponentsPlugin();

    if (typeof args[0] === 'function') {
      instance.#configuration = {
        iconMap: new Map<string, string>(),
      };
      args[0](instance.#configuration);
    } else {
      instance.#configuration = args[0];
    }

    if (!instance.#configuration.formatDateTime) {
      instance.#configuration.formatDateTime = (date?: string | number | Date) => new Intl.DateTimeFormat('default', { dateStyle: 'full' }).format(typeof date === 'string' ? new Date(date) : date);
    }

    if (!instance.#configuration.formatDate) {
      instance.#configuration.formatDate = (date?: string | number | Date) =>
        new Intl.DateTimeFormat('default', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(typeof date === 'string' ? new Date(date) : date);
    }

    if (!instance.#configuration.formatNumber) {
      instance.#configuration.formatNumber = (number?: string | number | bigint) => new Intl.NumberFormat('default', { maximumFractionDigits: 2 }).format(number == null ? 0 : Number(number));
    }

    if (!instance.#configuration.formatCurrency) {
      instance.#configuration.formatCurrency = (number?: string | number | bigint) =>
        new Intl.NumberFormat('default', { style: 'currency', currency: 'usd' }).format(number == null ? 0 : Number(number));
    }

    if (!instance.#configuration.formatPercent) {
      instance.#configuration.formatPercent = (number?: string | number | bigint) => new Intl.NumberFormat('default', { style: 'percent' }).format(number == null ? 0 : Number(number));
    }

    return instance;
  }

  register(container: IContainer): IContainer {
    container.register(services.AnimationService);
    container.register(services.NotificationService);
    container.register(attributes);
    container.register(elements);
    container.register(valueConverters);
    container.register(Registration.instance(IDesignSystemConfiguration, this.#configuration));
    container.register(
      ValidationHtmlConfiguration.customize((options) => {
        options.DefaultTrigger = ValidationTrigger.changeOrFocusout;
      }),
    );

    // container = container.register(AppTask.beforeCreate(IContainer, async c => {
    //     // console
    //     console.log(this.#configuration)
    //     c.register(elements);
    //     c.register(attributes);
    // }));

    return container;
  }
}
export { IDesignSystemConfiguration };
export { attributes, elements, valueConverters, services };
