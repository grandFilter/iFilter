import { action, computed } from 'easy-peasy';

import { ISVGModel } from '@/types/store/SVG';
import { colorsListToRGBValues } from '@/utils/color';

// import primitives from './primitives';
// import attributes from './attributes';

import palettes from './palettes.json';
import presets from './presets.json';

const blendModeList = [
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

const typesList = [
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

const SVGModel: ISVGModel = {
    palettes, // 调色板
    paletteId: 'teal-white',
    config: {
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
    },
    blendModeList,
    typesList,
    colorTypeList: ['sRGB', 'linearRGB'],

    // ----------------------------------------------
    // computed
    palette: computed(({ palettes, paletteId }: any) => {
        return palettes.find(({ id }: any) => paletteId === id);
    }),
    options: computed(({ paletteId, config, palette }: any) => {
        return {
            filterId: `filter__${paletteId}`,
            filter: config.filter,
            palette,
            imageOpacity: config.imageOpacity,
            blendMode: config.blendMode,
            grayscaleType: config.grayscaleType,
            colorInterpolationFilters: config.filter.colorInterpolationFilters,
        };
    }),
    filterConfig: computed(
        ({
            config: {
                imageOpacity,
                blendMode,
                grayscaleType,
                filter: { colorInterpolationFilters },
            },
            getFilterConfig,
        }: any) => {
            return getFilterConfig({
                imageOpacity,
                blendMode,
                grayscaleType,
                colorInterpolationFilters,
            });
        },
    ),
    getFilterConfig: computed(({ paletteId, palette, config, typesList }: any) => {
        return ({ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }: any) => {
            if (!palette) {
                return null;
            }

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

            const playgrounds = config.playgrounds.map((playground: any) => {
                switch (playground.id) {
                    case 'colormatrix': {
                        const { value } = typesList.find((i: any) => i.id === grayscaleType);
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

            const filter = {
                ...config.filter,
                colorInterpolationFilters,
            };

            return {
                id: `filter__${paletteId}`,
                playgrounds,
                filter,
                palette,
            };
        };
    }),
    // action
    setPalatteId: action((state: any, id: string) => {
        state.paletteId = id;
    }),
    setPalatte: action((state: any, palette: any) => {
        state.palettes = state.palettes.map((item: any) => {
            if (state.paletteId === item.id) {
                item = {
                    ...item,
                    ...palette,
                };
            }
            return item;
        });
    }),

    setSave: action((state: any, value: any) => {
        if ('opacity' in state) {
            state.config.imageOpacity = value.opacity;
        }

        if ('blendMode' in state) {
            state.config.imageOpacity = value.blendMode;
        }

        if ('grayscaleType' in state) {
            state.config.imageOpacity = value.grayscaleType;
        }

        if ('colorInterpolationFilters' in state) {
            state.config.filter.colorInterpolationFilters = value.colorInterpolationFilters;
        }
    }),
};

export default SVGModel;
