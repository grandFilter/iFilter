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
