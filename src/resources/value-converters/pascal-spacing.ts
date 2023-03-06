export class PascalSpacingValueConverter {
    toView(value) {
        if (!value) {
            return;
        }

        value = value.replace(/([A-Z])/g, ' $1').trim();
        return value;
    }
}
