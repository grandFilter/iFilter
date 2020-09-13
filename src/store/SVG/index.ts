import { action, computed } from 'easy-peasy';

import { ISVGModel } from '@/types/store/SVG';
import { colorsListToRGBValues } from '@/utils/color';

import { Assign } from 'utility-types';

// import primitives from './primitives';
// import attributes from './attributes';

import palettes from './palettes.json';
import presets from './presets.json';

const deepCopy = (data: any) => JSON.parse(JSON.stringify(data)) as typeof data;

const LIST_BLENDMODES = [
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

const LIST_TYPES = [
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

const CONFIG = {
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

function getFilterPlaygrounds({
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
        } as any,
    );

    return playgrounds.map((playground: { [k: string]: any }) => {
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

const palatteFilters = palettes.map(palette => {
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

const SVGModel: ISVGModel = {
    palettes, // 调色板
    paletteId: 'teal-white',
    config: { ...CONFIG },
    blendModeList: LIST_BLENDMODES,
    typesList: LIST_TYPES,
    colorTypeList: ['sRGB', 'linearRGB'],
    palatteFilters: deepCopy(palatteFilters),

    // ----------------------------------------------
    // computed
    palette: computed(({ palettes, paletteId }) => {
        return palettes.find(({ id }: any) => paletteId === id);
    }),
    options: computed(({ paletteId, config, palette }) => {
        return {
            filterId: `FILTER__${paletteId}`,
            filter: config.filter,
            palette,
            imageOpacity: config.imageOpacity,
            blendMode: config.blendMode,
            grayscaleType: config.grayscaleType,
            colorInterpolationFilters: config.filter.colorInterpolationFilters,
        };
    }),
    getFilterConfig: computed(({ config }) => {
        return ({ palette, imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }) => {
            if (!palette) {
                return null;
            }
            const playgrounds = getFilterPlaygrounds({
                playgrounds: config.playgrounds,
                palette,
                imageOpacity,
                blendMode,
                grayscaleType,
            });

            const filter = {
                ...config.filter,
                colorInterpolationFilters,
            };

            return {
                id: `FILTER__${palette.id}`,
                playgrounds,
                filter,
                palette,
            };
        };
    }),
    // ----------------------------------------------
    // action
    setPalatteId: action((state, id) => {
        state.paletteId = id;
    }),
    setPalatte: action((state, palette) => {
        state.palettes = state.palettes.map(item => {
            if (state.paletteId === item.id) {
                item = {
                    ...item,
                    ...palette,
                };
            }
            return item;
        });
    }),
    setConfig: action(({ config }, { imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }) => {
        config.imageOpacity = imageOpacity ?? config.imageOpacity;
        config.blendMode = blendMode ?? config.blendMode;
        config.grayscaleType = grayscaleType ?? config.grayscaleType;
        config.filter.colorInterpolationFilters = colorInterpolationFilters ?? config.filter.colorInterpolationFilters;
    }),
};

export default SVGModel;
