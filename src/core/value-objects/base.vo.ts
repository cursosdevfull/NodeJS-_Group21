export abstract class BaseVO<T> {
    protected _value!: T

    get value(): T {
        return this._value;
    }
}