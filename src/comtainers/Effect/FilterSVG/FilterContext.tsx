import React, { useState, useEffect, createContext, ReactElement } from 'react';
import { useStoreState } from '@/store';

type IFilterContext = [
    Partial<{
        palette: {
            id: string;
            name: string;
            colors: string[];
        };
        imageOpacity: number;
        blendMode: string;
        grayscaleType: string;
        colorInterpolationFilters: string;
    }>,
    Function,
];

export const FilterContext = createContext<IFilterContext>([{}, () => {}]);

export function FilterProvider({ children }: { children: ReactElement }) {
    const { palette, imageOpacity, blendMode, grayscaleType, colorInterpolationFilters } = useStoreState(
        ({ SVG }) => SVG.options,
    );

    const [state, setState] = useState<IFilterContext>([
        // 0: getter
        {
            palette,
            imageOpacity,
            blendMode,
            grayscaleType,
            colorInterpolationFilters,
        },
        // 1: setter
        ({ palette, imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }: IFilterContext[0]) => {
            const data = state[0];

            imageOpacity && imageOpacity >= 0 && (data.imageOpacity = imageOpacity);
            blendMode && (data.blendMode = blendMode);
            grayscaleType && (data.grayscaleType = grayscaleType);
            colorInterpolationFilters && (data.colorInterpolationFilters = colorInterpolationFilters);

            // deep object
            palette &&
                (data.palette = {
                    ...data.palette,
                    ...palette,
                });

            const result = { ...state[0], ...data };

            setState([result, state[1]]);
        },
    ]);

    // store 层数据变化，副作用到 context
    useEffect(() => {
        setState([
            {
                ...state[0],
                palette,
                imageOpacity,
                blendMode,
                grayscaleType,
                colorInterpolationFilters,
            },
            state[1],
        ]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [palette, imageOpacity, blendMode, grayscaleType, colorInterpolationFilters]);

    return <FilterContext.Provider value={state}>{children}</FilterContext.Provider>;
}
