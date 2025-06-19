import { BaseVO } from "./base.vo";

export class EmailVO extends BaseVO<string> {
    constructor(fieldName: string, value: string = "") {
        super();
        if (!value || !value.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
            throw new Error(`Invalid value for ${fieldName}:  must be a valid email address`);
        }
        this._value = value;
    }
}