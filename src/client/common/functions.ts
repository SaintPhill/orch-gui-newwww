export function isNumberOrEmptyString(value: string): boolean {
    return !isNaN(Number(value)) || value === '';
}
