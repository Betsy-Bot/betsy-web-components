export function moveUpInArray(arr: any[], index: number): void {
    if (index > 0) {
        const element = arr.splice(index, 1)[0];
        arr.splice(index - 1, 0, element);
    }
}

export function moveDownInArray(arr: any[], index: number): void {
    if (index < arr.length - 1) {
        const element = arr.splice(index, 1)[0];
        arr.splice(index + 1, 0, element);
    }
}
