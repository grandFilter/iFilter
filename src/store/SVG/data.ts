import { IDictionary } from '@/types';
import { Assign } from 'utility-types';
import { deepCopy } from '@/utils';

import { colorsListToRGBValues } from '@/utils/color';

import _palettes from './palettes.json';
import presets from './presets.json';

export const palettes = _palettes;

export const CONFIG = {
    playgrounds: presets.primitives,
    filter: {
        x: '-10%',
        y: '-10%',
        width: '120%',
        height: '120%',
        filterUnits: 'objectBoundingBox',
        primitiveUnits: 'userSpaceOnUse',
        colorInterpolationFilters: 'sRGB',
    },
    imageOpacity: 0.5,
    blendMode: 'normal',
    grayscaleType: 'red',
};

export const LIST_BLENDMODES = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
];

export const LIST_TYPES = [
    {
        id: 'red',
        name: 'Red',
        value: `1 0 0 0 0
              1 0 0 0 0
              1 0 0 0 0
              0 0 0 1 0`,
    },
    {
        id: 'green',
        name: 'Green',
        value: `0 1 0 0 0
              0 1 0 0 0
              0 1 0 0 0
              0 0 0 1 0`,
    },
    {
        id: 'blue',
        name: 'Blue',
        value: `0 0 1 0 0
              0 0 1 0 0
              0 0 1 0 0
              0 0 0 1 0`,
    },
    {
        id: 'all',
        name: 'All',
        value: `.33 .33 .33 0 0
              .33 .33 .33 0 0
              .33 .33 .33 0 0
              0 0 0 1 0`,
    },
];

export const palatteFilters = palettes.map(palette => {
    const { filter, playgrounds: originPlaygrounds, imageOpacity, blendMode, grayscaleType } = deepCopy(CONFIG);

    const playgrounds = getFilterPlaygrounds({
        palette,
        playgrounds: originPlaygrounds,
        imageOpacity,
        blendMode,
        grayscaleType,
    });

    return {
        filterId: `ORIGIN__${palette.id}`,
        filter,
        playgrounds,
        palette,
    };
});

export function getFilterPlaygrounds({
    playgrounds,
    palette,
    imageOpacity = 0,
    blendMode = 'normal',
    grayscaleType = 'red',
}: Assign<
    Pick<typeof CONFIG, 'playgrounds' | 'imageOpacity' | 'blendMode' | 'grayscaleType'>,
    { palette: typeof palettes[0]; playgrounds: {}[] }
>) {
    const rgbValues = colorsListToRGBValues(palette.colors);

    const propsSet = Object.keys(rgbValues).reduce(
        (prev, key) => {
            const id = `func${key.toUpperCase()}`;

            prev[id] = {
                id,
                param: 'tableValues',
                value: rgbValues[key as keyof typeof rgbValues].join(' '),
            };

            return prev;
        },
        {
            funcA: {
                id: 'funcA',
                param: 'tableValues',
                value: `0 ${imageOpacity}`,
            },
        } as IDictionary,
    );

    return playgrounds.map((playground: IDictionary) => {
        switch (playground.id) {
            case 'colormatrix': {
                const { value } = LIST_TYPES.find(i => i.id === grayscaleType) ?? {};
                playground.params.values = { value };
                break;
            }
            case 'componentTransfer': {
                playground.children = playground.children.map((item: any) => {
                    const { param, value } = (propsSet[item.id] || {}) as any;
                    (item.params || {})[param] = { value };
                    return item;
                });
                break;
            }
            case 'blend': {
                playground.params.mode = { value: blendMode };
                break;
            }
        }

        return playground;
    });
}
