export class DateFormatValueConverter {
    toView(value, format) {
        if (!value) {
            return;
        }
        if (!format) {
            format = 'MMMM Do YYYY, h:mmA';
        }
        try {
           return new Intl.DateTimeFormat('en', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value));
        } catch(e) {
            console.log(e);
            return value;
        }
    }
}
