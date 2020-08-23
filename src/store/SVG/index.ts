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
    palette: computed(({ paletteId, config }: any) => {
        return palettes.find(({ id }) => paletteId === id);
    }),
    filterConfig: computed(({ paletteId, config, typesList }: any) => {
        const palette = palettes.find(({ id }) => paletteId === id);
        if (palette) {
            const rgbValues = colorsListToRGBValues(palette.colors);
            const propsSet = Object.keys(rgbValues).reduce(
                (prev, key) => {
                    const id = `func${key.toUpperCase()}`;

                    prev[id] = {
                        id,
                        param: 'tableValues',
                        value: rgbValues[key].join(' '),
                    };

                    return prev;
                },
                {
                    funcA: {
                        id: 'funcA',
                        param: 'tableValues',
                        value: `0 ${config.imageOpacity}`,
                    },
                } as any,
            );

            // console.log(propsSet);

            config.playgrounds.map((playground: any) => {
                switch (playground.id) {
                    case 'colormatrix': {
                        const type = config.grayscaleType;
                        const { value } = typesList.find((i: any) => i.id === type);

                        playground.params.values = { value };
                        break;
                    }
                    case 'componentTransfer': {
                        playground.children = playground.children.map((item: any) => {
                            const id = item.id;
                            const { param, value } = (propsSet[id] || {}) as any;
                            (item.params || {})[param] = { value };
                            return item;
                        });
                        break;
                    }
                    case 'blend': {
                        playground.params.mode = { value: config.blendMode };
                        break;
                    }
                }

                return playground;
            });
        }

        return {
            filterId: `filter__${paletteId}`,
            palette,
            playgrounds: config.playgrounds,
            filter: config.filter,
            imageOpacity: config.imageOpacity,
            blendMode: config.blendMode,
            grayscaleType: config.grayscaleType,
        };
    }),
    // action
    setPalatte: action((state: any, id: string) => {
        state.paletteId = id;
    }),
    setOpacity: action((state: any, value: number) => {
        state.config.imageOpacity = value;
    }),
    setBlendMode: action((state: any, value: string) => {
        state.config.blendMode = value;
    }),
    setGrayscaleType: action((state: any, value: string) => {
        state.config.grayscaleType = value;
    }),
    setColorInterpolationFilters: action((state: any, value: string) => {
        state.config.filter.colorInterpolationFilters = value;
    }),
};

export default SVGModel;
