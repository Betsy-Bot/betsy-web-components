import { ButtonSize } from '../../elements/k-button/button-size';
import { ButtonType } from '../../elements/k-button/k-button';
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface NotificationAction {
  content: string;
  type?: ButtonType;
  color?: ButtonType;
  size?: ButtonSize;
  onClick: () => void;
}
