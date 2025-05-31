import { BaseVO } from "./base.vo";

export class StringVO extends BaseVO<string> {
    constructor(fieldName: string, value: string = "", min:number = 3 ) {
        super();
        if (!value || value.trim().length < min) {
            throw new Error(`Invalid value for ${fieldName}: must be at least ${min} characters long`);
        }
        this._value = value;
    }
}