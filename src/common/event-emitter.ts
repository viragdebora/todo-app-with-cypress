type EventEmitterHandler<T> = (value: T) => void;

export type EventEmitter<T> = ((handler: EventEmitterHandler<T>) => VoidFunction) & ({ emit: (value: T) => void; });

export function createEventEmitter<T>(): EventEmitter<T> {
    let handlers: Array<EventEmitterHandler<T>> = [];

    const eventEmitter = (handler: EventEmitterHandler<T>): VoidFunction => {
        handlers.push(handler);
        return () => {
            handlers = handlers.filter(h => h !== handler);
        };
    };

    eventEmitter.emit = (value: T) => {
        for (const handler of handlers) {
            handler(value);
        }
    };

    return eventEmitter;
}
