import { IDictionary } from '@/types';
import { SVG_TYPE } from '@/constants';
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
 *
 *
 * @export
 * @param {File} file
 * @return {*}
 */
export async function getBase64ByFile(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            resolve(base64);
        };
        reader.onerror = err => reject(err);
        reader.readAsDataURL(file);
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

/**
 * SVG 转为 Image
 *
 * @export
 * @param {SVGSVGElement} svgElem
 * @param {keyof typeof SVG_TYPE} [type=SVG_TYPE.blob]
 * @return {*}  {Promise<HTMLImageElement>}
 */
export function SVGToImage(
    svgElem: SVGSVGElement,
    type: keyof typeof SVG_TYPE = SVG_TYPE.blob,
): Promise<HTMLImageElement> {
    const svgString = new XMLSerializer().serializeToString(svgElem);

    const image = new Image();

    switch (type) {
        case SVG_TYPE.blob: {
            image.src = URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' }));
            break;
        }
        case SVG_TYPE.base64: {
            image.src = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
            break;
        }
        default: {
            return Promise.reject(new Error(`SVG type invalid`));
        }
    }

    return new Promise((resolve, reject) => {
        image.onload = () => resolve(image);
        image.onerror = err => reject(err);
    });
}
