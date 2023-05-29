export type Handler<T> = (value: T) => void;

export type Observable<T> = {
    value: T;
    onChange(handler: Handler<T>): VoidFunction;
};

export const createObservable = <T>(initialValue: T): Observable<T> => {
    let _value = initialValue;
    const handlers: Array<Handler<T>> = [];

    const notifyHandlers = (): void => {
        for (const handler of handlers) {
            handler(_value);
        }
    };

    return {
        get value() {
            return _value;
        },
        set value(newValue: T) {
            _value = newValue;
            notifyHandlers();
        },
        onChange(handler: Handler<T>): VoidFunction {
            handlers.push(handler);
            return () => handlers.filter(h => h !== handler);
        },
    };
};
