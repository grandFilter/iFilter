import Localforage from 'localforage';

export const localforage = Localforage.createInstance({
    name: 'FILTER',
});
/**
 * 设置本地缓存
 *
 * @param {string} key
 * @param {T} value
 */
export async function setItem<T>(key: string, value: T) {
    try {
        await localforage.setItem(key, value);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

/**
 * 获取本地缓存
 *
 * @param {string} key
 * @param {T} [defaultValue]
 */
export async function getItem<T = any>(key: string, defaultValue?: T): Promise<T> {
    try {
        const value = (await localforage.getItem(key)) as T | undefined;

        if (!value) {
            return defaultValue as T;
        }
        return value as T;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

/**
 *  删除本地缓存
 *
 * @param {string} key
 */
export async function removeItem(key: string) {
    localStorage.removeItem(key);
    try {
        await localforage.getItem(key);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
