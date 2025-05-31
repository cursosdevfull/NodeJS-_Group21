import { BaseVO } from "./base.vo";

export class NumberVO extends BaseVO<number> {
    constructor(fieldName: string, value: number = 0, min: number = 0) {
        super();
        if (typeof value !== 'number' || isNaN(value) || value < min) {
            throw new Error(`Invalid value for ${fieldName}: must be a number greater than or equal to ${min}`);
        }
        this._value = value;
    }
}