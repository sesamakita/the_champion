import { useState, useEffect } from 'react';
import StorageService from '../services/StorageService';

/**
 * usePersistedState
 * A custom hook that functions like useState but persists the value to local storage.
 */
function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        return StorageService.get(key, defaultValue);
    });

    useEffect(() => {
        StorageService.save(key, state);
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;
