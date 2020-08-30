import React, { useState, createContext, ReactElement } from 'react';
import { useStoreState } from '@/store';

type IFilterContext = [
    {
        imageOpacity?: number;
        blendMode?: string;
        grayscaleType?: string;
        colorInterpolationFilters?: string;
    },
    Function,
];

export const FilterContext = createContext<IFilterContext>([{}, () => {}]);

export function FilterProvider({ children }: { children: ReactElement }) {
    const { imageOpacity, blendMode, grayscaleType, colorInterpolationFilters } = useStoreState(
        ({ SVG }) => SVG.options,
    );

    const [state, setState] = useState<IFilterContext>([
        // 0: value
        {
            imageOpacity,
            blendMode,
            grayscaleType,
            colorInterpolationFilters,
        },
        // 1: setter
        (value: any) => {
            setState([{ ...state[0], ...value }, state[1]]);
        },
    ]);

    return <FilterContext.Provider value={state}>{children}</FilterContext.Provider>;
}
