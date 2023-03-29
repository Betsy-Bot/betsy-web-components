import { DI, IContainer, IPlatform, Registration, Task } from 'aurelia';

export type IAnimationService = AnimationService;
export const IAnimationService = DI.createInterface<IAnimationService>('IAnimationService');
export class AnimationService {
  public static register(container: IContainer): void {
    Registration.singleton(IAnimationService, AnimationService).register(container);
  }

  constructor(@IPlatform private readonly platform: IPlatform) {}

  public animate(from: number, to: number, duration: number, update: (value: number | string) => void, easing?: keyof typeof easings, done?: () => Promise<void> | void): Task<void> | undefined {
    // Early bail out if called incorrectly
    if (typeof from !== 'number' || typeof to !== 'number' || typeof duration !== 'number' || typeof update !== 'function') return;
    const easingFunc = typeof easing === 'string' ? easings[easing] : easings.linear;

    done ??= (): void => {
      /*noop*/
    };

    const change = to - from;
    const start = +new Date();

    const task = this.platform.domWriteQueue.queueTask(
      () => {
        const time = +new Date() - start;
        if (time >= 0) {
          update(easingFunc(time, from, change, duration, undefined));
        }

        if (time >= 0 && time >= duration) {
          update(to);
          task.cancel();
          done && void done();
        }
      },
      { persistent: true },
    );
    return task;
  }

  public animateCSS(
    element: HTMLElement,
    property: string,
    unit: string | undefined,
    from: Parameters<AnimationService['animate']>[0],
    to: Parameters<AnimationService['animate']>[1],
    duration: Parameters<AnimationService['animate']>[2],
    easing?: Parameters<AnimationService['animate']>[4],
    done?: Parameters<AnimationService['animate']>[5],
  ): Task<void> | undefined {
    const update = (value: string | number): void => {
      element.style.setProperty(property, String(value) + (unit ?? ''));
    };
    return this.animate(from, to, duration, update, easing, done);
  }
}

export const easings = {
  linear: (time: number, from: number, change: number, duration: number): number => (change * time) / duration + from,
  easeInQuad: (time: number, from: number, change: number, duration: number): number => change * (time /= duration) * time + from,
  easeOutQuad: (time: number, from: number, change: number, duration: number): number => -change * (time /= duration) * (time - 2) + from,
  easeInOutQuad: (time: number, from: number, change: number, duration: number): number => {
    if ((time /= duration / 2) < 1) return (change / 2) * time * time + from;
    return (-change / 2) * (--time * (time - 2) - 1) + from;
  },

  easeInCubic: (time: number, from: number, change: number, duration: number): number => change * (time /= duration) * time * time + from,
  easeOutCubic: (time: number, from: number, change: number, duration: number): number => change * ((time = time / duration - 1) * time * time + 1) + from,
  easeInOutCubic: (time: number, from: number, change: number, duration: number): number => {
    if ((time /= duration / 2) < 1) return (change / 2) * time * time * time + from;
    return (change / 2) * ((time -= 2) * time * time + 2) + from;
  },
  easeInQuart: (time: number, from: number, change: number, duration: number): number => change * (time /= duration) * time * time * time + from,
  easeOutQuart: (time: number, from: number, change: number, duration: number): number => -change * ((time = time / duration - 1) * time * time * time - 1) + from,
  easeInOutQuart: (time: number, from: number, change: number, duration: number): number => {
    if ((time /= duration / 2) < 1) return (change / 2) * time * time * time * time + from;
    return (-change / 2) * ((time -= 2) * time * time * time - 2) + from;
  },
  easeInQuint: (time: number, from: number, change: number, duration: number): number => change * (time /= duration) * time * time * time * time + from,
  easeOutQuint: (time: number, from: number, change: number, duration: number): number => change * ((time = time / duration - 1) * time * time * time * time + 1) + from,
  easeInOutQuint: (time: number, from: number, change: number, duration: number): number => {
    if ((time /= duration / 2) < 1) return (change / 2) * time * time * time * time * time + from;
    return (change / 2) * ((time -= 2) * time * time * time * time + 2) + from;
  },
  easeInSine: (time: number, from: number, change: number, duration: number): number => -change * Math.cos((time / duration) * (Math.PI / 2)) + change + from,
  easeOutSine: (time: number, from: number, change: number, duration: number): number => change * Math.sin((time / duration) * (Math.PI / 2)) + from,
  easeInOutSine: (time: number, from: number, change: number, duration: number): number => (-change / 2) * (Math.cos((Math.PI * time) / duration) - 1) + from,
  easeInExpo: (time: number, from: number, change: number, duration: number): number => (time === 0 ? from : change * Math.pow(2, 10 * (time / duration - 1)) + from),
  easeOutExpo: (time: number, from: number, change: number, duration: number): number => (time === duration ? from + change : change * (-Math.pow(2, (-10 * time) / duration) + 1) + from),
  easeInOutExpo: (time: number, from: number, change: number, duration: number): number => {
    if (time === 0) return from;
    if (time === duration) return from + change;
    if ((time /= duration / 2) < 1) return (change / 2) * Math.pow(2, 10 * (time - 1)) + from;
    return (change / 2) * (-Math.pow(2, -10 * --time) + 2) + from;
  },
  easeInCirc: (time: number, from: number, change: number, duration: number): number => -change * (Math.sqrt(1 - (time /= duration) * time) - 1) + from,
  easeOutCirc: (time: number, from: number, change: number, duration: number): number => change * Math.sqrt(1 - (time = time / duration - 1) * time) + from,
  easeInOutCirc: (time: number, from: number, change: number, duration: number): number => {
    if ((time /= duration / 2) < 1) return (-change / 2) * (Math.sqrt(1 - time * time) - 1) + from;
    return (change / 2) * (Math.sqrt(1 - (time -= 2) * time) + 1) + from;
  },
  easeInElastic: (time: number, from: number, change: number, duration: number): number => {
    let p = 0;
    let a = change;
    if (time === 0) return from;
    if ((time /= duration) === 1) return from + change;
    if (!p) p = duration * 0.3;
    let speed = (p / (2 * Math.PI)) * Math.asin(change / a);
    if (a < Math.abs(change)) {
      a = change;
      speed = p / 4;
    }
    return -(a * Math.pow(2, 10 * (time -= 1)) * Math.sin(((time * duration - speed) * (2 * Math.PI)) / p)) + from;
  },
  easeOutElastic: (time: number, from: number, change: number, duration: number): number => {
    let p = 0;
    let a = change;
    if (time === 0) return from;
    if ((time /= duration) === 1) return from + change;
    if (!p) p = duration * 0.3;
    let speed = (p / (2 * Math.PI)) * Math.asin(change / a);
    if (a < Math.abs(change)) {
      a = change;
      speed = p / 4;
    }
    return a * Math.pow(2, -10 * time) * Math.sin(((time * duration - speed) * (2 * Math.PI)) / p) + change + from;
  },
  easeInOutElastic: (time: number, from: number, change: number, duration: number): number => {
    let p = 0;
    let a = change;
    if (time === 0) return from;
    if ((time /= duration / 2) === 2) return from + change;
    if (!p) p = duration * (0.3 * 1.5);
    let speed = (p / (2 * Math.PI)) * Math.asin(change / a);
    if (a < Math.abs(change)) {
      a = change;
      speed = p / 4;
    }
    if (time < 1) return -0.5 * (a * Math.pow(2, 10 * (time -= 1)) * Math.sin(((time * duration - speed) * (2 * Math.PI)) / p)) + from;
    return a * Math.pow(2, -10 * (time -= 1)) * Math.sin(((time * duration - speed) * (2 * Math.PI)) / p) * 0.5 + change + from;
  },
  easeInBack: (time: number, from: number, change: number, duration: number, speed?: number): number => {
    // eslint-disable-next-line eqeqeq
    if (speed == undefined) speed = 1.70158;
    return change * (time /= duration) * time * ((speed + 1) * time - speed) + from;
  },
  easeOutBack: (time: number, from: number, change: number, duration: number, speed?: number): number => {
    // eslint-disable-next-line eqeqeq
    if (speed == undefined) speed = 1.70158;
    return change * ((time = time / duration - 1) * time * ((speed + 1) * time + speed) + 1) + from;
  },
  easeInOutBack: (time: number, from: number, change: number, duration: number, speed?: number): number => {
    // eslint-disable-next-line eqeqeq
    if (speed == undefined) speed = 1.70158;
    if ((time /= duration / 2) < 1) return (change / 2) * (time * time * (((speed *= 1.525) + 1) * time - speed)) + from;
    return (change / 2) * ((time -= 2) * time * (((speed *= 1.525) + 1) * time + speed) + 2) + from;
  },
  easeInBounce: (time: number, from: number, change: number, duration: number): number => change - easings.easeOutBounce(duration - time, 0, change, duration) + from,
  easeOutBounce: (time: number, from: number, change: number, duration: number): number => {
    if ((time /= duration) < 1 / 2.75) {
      return change * (7.5625 * time * time) + from;
    } else if (time < 2 / 2.75) {
      return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + from;
    } else if (time < 2.5 / 2.75) {
      return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + from;
    } else {
      return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + from;
    }
  },
  easeInOutBounce: (time: number, from: number, change: number, duration: number): number => {
    if (time < duration / 2) return easings.easeInBounce(time * 2, 0, change, duration) * 0.5 + from;
    return easings.easeOutBounce(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + from;
  },
};
