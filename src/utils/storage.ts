// 是否支持 localStorage
export const isLocalStorage = window.Storage && window.localStorage && window.localStorage instanceof Storage;

/**
 * 设置本地缓存
 *
 * @param {string} key
 * @param {T} value
 */
export function setItem<T>(key: string, value: T) {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
}

/**
 * 获取本地缓存
 *
 * @param {string} key
 * @param {T} [defaultValue]
 */
export function getItem<T = any>(key: string, defaultValue?: T): T {
    const stringValue = localStorage.getItem(key);
    if (String(stringValue) === 'null') {
        return defaultValue as T;
    }
    return JSON.parse(stringValue as string);
}

/**
 *  删除本地缓存
 *
 * @param {string} key
 */
export function removeItem(key: string) {
    localStorage.removeItem(key);
}
