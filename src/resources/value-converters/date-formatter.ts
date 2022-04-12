import moment from 'moment';
export class DateFormatValueConverter {
    toView(value, format) {
        if (!value) {
            return;
        }
        if (!format) {
            format = 'MMMM Do YYYY, h:mmA';
        }
        return moment.utc(value).local().format(format);
    }
}
