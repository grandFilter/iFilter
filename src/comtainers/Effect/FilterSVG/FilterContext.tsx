import React, { useEffect, useReducer, useMemo, createContext, ReactElement } from 'react';
import { useStoreState } from '@/store';
import { useBase64 } from '@/services/hooks/localforage';

import { dataURLToBlob } from '@/utils';

const defaltValue = {
    base64: '',
    thumbnail: '',
    palette: (undefined as unknown) as { id: string; name: string; colors: string[] } | undefined,
    imageOpacity: 100,
    blendMode: '',
    grayscaleType: '',
    colorInterpolationFilters: '',
};

type IFilterContext = [typeof defaltValue, (payload: Partial<IFilterContext[0]>) => void];

enum ACTION {
    change = 'change',
}

// TODO: 声明 any
export const FilterContext = createContext<any>([defaltValue, () => {}]);

export function FilterProvider({ children }: { children: ReactElement }) {
    const { palette, imageOpacity, blendMode, grayscaleType, colorInterpolationFilters } = useStoreState(
        ({ SVG }) => SVG.options,
    );
    const [base64] = useBase64();

    const initialData = {
        base64,
        thumbnail: base64 && URL.createObjectURL(dataURLToBlob(base64)), // TODO: 压缩图片
        palette,
        imageOpacity,
        blendMode,
        grayscaleType,
        colorInterpolationFilters,
    };
    const reducer = (
        state: IFilterContext[0],
        action: { type: keyof typeof ACTION; payload: Partial<IFilterContext[0]> },
    ) => {
        switch (action.type) {
            case ACTION.change:
                return { ...state, ...action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialData);
    const setState = (payload: Partial<IFilterContext[0]>) => dispatch({ type: ACTION.change, payload });

    // 使用 useMemo 规避 context 消费的组件 再次render
    const contextValue = useMemo(() => {
        return [state, setState];
    }, [state]);

    // store 层数据变化，副作用到 context
    useEffect(() => {
        setState({
            base64,
            thumbnail: base64 && URL.createObjectURL(dataURLToBlob(base64)),
            palette,
            imageOpacity,
            blendMode,
            grayscaleType,
            colorInterpolationFilters,
        });
    }, [base64, blendMode, colorInterpolationFilters, grayscaleType, imageOpacity, palette]);

    return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>;
}
