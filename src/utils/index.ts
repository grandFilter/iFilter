import { IDictionary } from '@/types';
/**
 * 加载图片
 *
 * @param {string} url
 *  * @param {boolean} [crossOrigin=false]
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(url: string, crossOrigin: boolean = false): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = crossOrigin ? 'Anonymous' : null;

        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = url;
    });
}

/**
 * 深拷贝对象 (JSON.parse(JSON.stringify(data)))
 *
 * @export
 * @param {IDictionary<any>} data
 * @returns
 */
export function deepClone<T = IDictionary<any>>(data: T) {
    const walk = (obj: IDictionary<any>) => {
        let resultObj = {} as any;

        if (Array.isArray(obj)) {
            resultObj = [];
        }

        for (let key in obj) {
            const value = obj[key] as any;
            if (Array.isArray(value)) {
                resultObj[key] = [...value];
            } else if (typeof value === 'object') {
                resultObj[key] = walk(value);
            } else {
                resultObj[key] = value;
            }
        }

        return resultObj;
    };

    return walk(data) as T;
}
