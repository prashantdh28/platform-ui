import { useState, useEffect, useCallback } from "react";

export function useDebouncedValue(input, time = 500) {
    const [debouncedValue, setDebouncedValue] = useState(input);

    // every time input value has changed - set interval before it's actually committed
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
    }, [input, time]);

    return debouncedValue;
}

export const useDebounce = (callback, delay) => {
    const [timeoutId, setTimeoutId] = useState(null);

    const debouncedCallback = useCallback(
        (...args) => {
            clearTimeout(timeoutId);
            const newTimeoutId = setTimeout(() => {
                callback(...args);
            }, delay);
            setTimeoutId(newTimeoutId);
        },
        [callback, delay, timeoutId]
    );

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    return debouncedCallback;
};