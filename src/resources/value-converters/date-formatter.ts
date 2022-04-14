import moment from 'moment';
export class DateFormatValueConverter {
    toView(value, format) {
        if (!value) {
            return;
        }
        if (!format) {
            format = 'MMMM Do YYYY, h:mmA';
        }
        const date = moment.utc(value);
        if (!date.isValid()) {
            return value;
        }
        return date.local().format(format);
    }
}
