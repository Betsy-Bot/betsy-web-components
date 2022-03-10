import Toast from 'lets-toast';

export class ToastService {
    private readonly _toast;
    constructor() {
        this._toast = Toast({
            // Delay in miliseconds. Set to 0 for non disappearing toast notifications.
            delay: 5000,

            // Dismiss button text. Only shown if `dismissible` is `true`.
            dismiss: 'dismiss',

            // Toast notifications are dismissible.
            dismissible: true,

            // Place new toast notifications at the top of the stack.
            // If `vPos` is set to 'bottom', new toast notifications will be placed on
            // the bottom of the stack.
            newestAtTop: true,

            // Toast notification severity (info, error, success, warning).
            severity: 'info',

            // Horizontal screen positioning (left, center, right).
            hPos: 'right',

            // Vertical screen positioning (top, center, bottom).
            vPos: 'top',
        })
    }

    info(content: string) {
        this._toast(content);
    }

    error(content: string) {
        this._toast(content, {
            severity: 'warning'
        })
    }
}
