import { BaseVO } from "./base.vo";

export class ArrayVO extends BaseVO<Array<string>> {
    constructor(fieldName: string, value: Array<string> = [], min: number = 1) {
        super()
        if (!Array.isArray(value) || value.length < min) {
            throw new Error(`Invalid value for ${fieldName}: must be an array with at least ${min} elements`);
        }
    }
}