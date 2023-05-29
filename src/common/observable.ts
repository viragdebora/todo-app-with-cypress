import { createEventEmitter, type EventEmitter } from './event-emitter';

export type Observable<T> = {
    value: T;
    onChange: EventEmitter<T>;
};

export const createObservable = <T>(initialValue: T): Observable<T> => {
    let _value = initialValue;
    const onChange = createEventEmitter<T>();

    return {
        get value() {
            return _value;
        },
        set value(newValue: T) {
            _value = newValue;
            onChange.emit(_value);
        },
        onChange,
    };
};
