export class ObjectKeysValueConverter {
    toView(obj) {
        // Create a temporary array to populate with object keys
        const temp = [];

        // A basic for..in loop to get object properties
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                temp.push(obj[prop]);
            }
        }

        return temp;
    }
}
