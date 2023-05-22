import { useState, useEffect } from 'react';
import { Observable } from "../common/observable";

export const useObservable = <T>(observable: Observable<T>): T => {
    const [state, setState] = useState<T>(observable.value);

    useEffect(() => {
        const unsubscribe = observable.onChange((newState) => {
            setState(newState);
        });

        return () => unsubscribe();
    }, [observable.onChange]);

    return state;
};
