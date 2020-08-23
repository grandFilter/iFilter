import { $Keys } from 'utility-types';

const convertHEXtoRGB = (hex: string) => {
    const R = hex.slice(0, 2);
    const G = hex.slice(2, 4);
    const B = hex.slice(4, 6);

    return {
        r: parseInt(R, 16),
        g: parseInt(G, 16),
        b: parseInt(B, 16),
    };
};

/**
 * hex颜色转化rgb
 *
 * @param {string[]} colors
 */
export function colorsListToRGBValues(colors: string[]) {
    const rgbValues = colors.reduce(
        (prev, item) => {
            const rgbSet = convertHEXtoRGB(item.substr(1));

            Object.keys(rgbSet).forEach((k: string) => {
                const key = k as $Keys<typeof rgbSet>;
                rgbSet[key] = Math.round((rgbSet[key] / 255) * 100) / 100;
            });

            prev.r.push(rgbSet.r);
            prev.g.push(rgbSet.g);
            prev.b.push(rgbSet.b);

            return prev;
        },
        { r: [], g: [], b: [] } as { [key: string]: number[] },
    );

    return rgbValues;
}
