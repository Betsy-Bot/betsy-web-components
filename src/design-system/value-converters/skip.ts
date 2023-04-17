import { valueConverter } from 'aurelia';

@valueConverter('skip')
export class SkipValueConverter {
  public toView(value: unknown[], amount: number) {
    return value.slice(amount);
  }
}
