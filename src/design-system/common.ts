export const numberToPixels = (value: string | number | null | undefined): string | number | null | undefined => {
  if (!value) return value;
  if (typeof value === 'string' && value.trim().includes(' ')) {
    value
      .trim()
      .split(' ')
      .map((x) => numberToPixels(x))
      .join(' ');
  }

  if (isNaN(Number(value))) return String(value);
  return `${value}px`;
};

export function numberToPixelsInterceptor(value: unknown): unknown {
  return numberToPixels(value as string | number | undefined);
}

export function gridTemplateRowSetter(value: string | number | undefined): string | number | undefined {
  if (!value) return value;
  if (!isNaN(Number(value))) return `repeat(${value}, 1fr)`;
  return value;
}

export function gridTemplateRowSetterInterceptor(value: unknown): unknown {
  return gridTemplateRowSetter(value as string | number | undefined);
}

export function ifExistsThenTrue(value: unknown): unknown {
  return value !== 'false' && (value === '' || value);
}

export function uid(): string {
  return Math.random().toString(36).substring(2);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface DisplayValue<T = number> {
  display: string;
  value: T;
}

export function noop(e: Event): boolean {
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}

export const standardCapturesToIgnore = ['ripple', 'animate', 'slot', 'part', 'style', 'class', 'ref', 't', 'id', 'show'];

export const captureFilter = (attr: string) => {
  if (attr.trim() === '') return false;

  return !standardCapturesToIgnore.includes(attr);
};

export function assignDefined(target: unknown, ...sources: unknown[]): void {
  const sourcesArray = sources as Record<string, unknown>[];
  const targetObj = target as Record<string, unknown>;

  sourcesArray.forEach((source) => {
    Object.keys(source as object).forEach((key) => {
      const val: unknown = source[key];
      if (val !== undefined) {
        targetObj[key] = val;
      }
    });
  });
}

export function getColorByType(type: NotificationType): string {
  switch (type) {
    case 'danger':
      return 'var(--error)';
    case 'dark':
      return 'var(--dark)';
    case 'info':
      return 'var(--info)';
    case 'primary':
      return 'var(--primary)';
    case 'secondary':
      return 'var(--dark-coral-700)';
    case 'success':
      return 'var(--success)';
    case 'warning':
      return 'var(--warning)';
  }
  return '';
}
