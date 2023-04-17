import { valueConverter } from 'aurelia';

@valueConverter('take')
export class TakeValueConverter {
  public toView(value: unknown[], amount: number) {
    return value.slice(0, amount);
  }
}
