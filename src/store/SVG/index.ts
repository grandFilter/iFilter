import { action, computed } from 'easy-peasy';

import { ISVGModel } from '@/types/store/SVG';

import { deepCopy } from '@/utils';
import { LIST_BLENDMODES, LIST_TYPES, getFilterPlaygrounds, CONFIG, palatteFilters, palettes } from './data';

const SVGModel: ISVGModel = {
    ...deepCopy({
        palettes, // 调色板
        paletteId: 'teal-white',
        config: { ...CONFIG },
        blendModeList: LIST_BLENDMODES,
        typesList: LIST_TYPES,
        colorTypeList: ['sRGB', 'linearRGB'],
        palatteFilters,
    }),

    // ----------------------------------------------
    // computed
    options: computed(({ paletteId, config, palettes }) => {
        return {
            filterId: `FILTER__${paletteId}`,
            filter: config.filter,
            palette: palettes.find(({ id }) => paletteId === id),
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
