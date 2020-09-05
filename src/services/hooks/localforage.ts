import { useState, useCallback, useEffect } from 'react';
import { localforage } from '@/utils/localforage';
import { STORAGE_FILE } from '@/constants';

interface IData {
    base64: string;
    [key: string]: any;
}

/**
 *  文件 localforage hook
 *
 */
export function useLocalforage() {
    const [state, setState] = useState<IData>({ base64: '' });
    const getItem = useCallback(async () => {
        const store = (await localforage.getItem(STORAGE_FILE)) as IData;
        // console.log('#getItem', store);
        return {
            ...state,
            ...store,
        };
    }, [state]);

    const setItem = useCallback(
        async (data: IData) => {
            await localforage.setItem(STORAGE_FILE, data);
            // console.log('#setItem', data);
            setState({
                ...state,
                ...data,
            });
        },
        [state],
    );
    return [getItem, setItem] as [() => Promise<IData>, (data: IData) => void];
}

/**
 *  读取缓存中 base64 hook
 *
 */
export function useBase64() {
    const [base64, setBase64] = useState('');
    const [getStore, setStore] = useLocalforage();

    useEffect(() => {
        (async () => {
            const data = await getStore();
            // console.log('#test', data);
            setBase64(data.base64);
        })();
    }, [getStore]);

    const setter = async (base64: string) => {
        const data = await getStore();
        setBase64(base64);
        setStore({
            ...data,
            base64,
        });
    };

    return [base64, setter] as [string, (base64: string) => Promise<void>];
}
