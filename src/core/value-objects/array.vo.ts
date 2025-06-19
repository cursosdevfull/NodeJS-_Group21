import { BaseVO } from "./base.vo";

export class ArrayVO<T> extends BaseVO<Array<T>> {
    constructor(fieldName: string, value: Array<T> = [], min: number = 1) {
        super()
        if (!Array.isArray(value) || value.length < min) {
            throw new Error(`Invalid value for ${fieldName}: must be an array with at least ${min} elements`);
        }
        this._value = value;
    }
}