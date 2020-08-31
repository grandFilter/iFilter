export const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
};

export const hexToRgb = (hex: string) => {
    const { r, g, b } = convertHEXToRGB(hex);
    return [r, g, b] as [number, number, number];
};

/**
 * rgb 颜色转为 hex
 *
 * @link {https://css-tricks.com/converting-color-spaces-in-javascript/}
 *
 * @export
 * @param {string} rgb
 * @returns
 */
export function convertRGBToHEX(rgb: string) {
    const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    let [r, g, b] = rgb
        .substr(4)
        .split(')')[0]
        .split(sep)
        .map(v => Number(v));

    return rgbToHex(r, g, b);
}

/**
 * hex 颜色转化 rgb
 *
 * @export
 * @param {string} hex
 * @returns
 */
export function convertHEXToRGB(hex: string) {
    hex = hex.substr(1);
    const R = hex.slice(0, 2);
    const G = hex.slice(2, 4);
    const B = hex.slice(4, 6);

    return {
        r: parseInt(R, 16),
        g: parseInt(G, 16),
        b: parseInt(B, 16),
    };
}

// import { $Keys } from 'utility-types';
// 等同于 $Keys<typeof ReturnType<convertHEXtoRGB>>;
type TypeRGBKeys = keyof ReturnType<typeof convertHEXToRGB>;

/**
 * 将一组 hex 颜色 转为 RGB
 *
 * @param {string[]} colors
 */
export function colorsListToRGBValues(colors: string[]) {
    const rgbValues = colors.reduce(
        (prev, item) => {
            const rgbSet = convertHEXToRGB(item);

            Object.keys(rgbSet).forEach((k: string) => {
                const key = k as TypeRGBKeys;
                rgbSet[key] = Math.round((rgbSet[key] / 255) * 100) / 100;
            });

            prev.r.push(rgbSet.r);
            prev.g.push(rgbSet.g);
            prev.b.push(rgbSet.b);

            return prev;
        },
        { r: [], g: [], b: [] } as { [key in TypeRGBKeys]: number[] },
    );

    return rgbValues;
}
