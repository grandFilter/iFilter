import React, { useEffect, useReducer, useMemo, createContext, ReactElement } from 'react';
import { useStoreState } from '@/store';
import { useBase64 } from '@/services/hooks/localforage';

import { getThumbnailBlob } from '@/utils';
import { $Values } from 'utility-types';

const defaltValue = {
    editing: false,
    base64: '',
    thumbnail: '',
    palette: { id: '', name: '', colors: [] } as { id: string; name: string; colors: string[] },
    imageOpacity: 100,
    blendMode: '',
    grayscaleType: '',
    colorInterpolationFilters: '',
};

type IFilterContext = [typeof defaltValue, (payload: Partial<IFilterContext[0]>) => void];

enum ACTION {
    change = 'Change',
}

export const FilterContext = createContext<IFilterContext>([defaltValue, () => {}]);

export function FilterProvider({ children }: { children: ReactElement }) {
    const {
        palette = { id: '', name: '', colors: [] },
        imageOpacity,
        blendMode,
        grayscaleType,
        colorInterpolationFilters,
    } = useStoreState(({ SVG }) => SVG.options);
    const [base64] = useBase64();

    const initialData = {
        editing: false,
        base64,
        thumbnail: base64,
        palette,
        imageOpacity,
        blendMode,
        grayscaleType,
        colorInterpolationFilters,
    };
    const reducer = (
        state: IFilterContext[0],
        action: { type: $Values<typeof ACTION>; payload: Partial<IFilterContext[0]> },
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
        return [state, setState] as [typeof state, typeof setState];
    }, [state]);

    // store 层数据变化，副作用到 context
    useEffect(() => {
        (async () => {
            const data = {
                base64,
                thumbnail: state.thumbnail,
                palette,
                imageOpacity,
                blendMode,
                grayscaleType,
                colorInterpolationFilters,
            };
            // warn: 由于每次生成一个新的 blob URL: => "blob:http://localhost:3000/266c0711-76dd-4a24-af1f-46a8014204ff"
            if (base64 !== state.base64) {
                const thumbnail = base64 && URL.createObjectURL(await getThumbnailBlob(base64));
                Object.assign(data, { thumbnail });
            }

            setState(data);
        })();
    }, [
        state.base64,
        state.thumbnail,
        base64,
        blendMode,
        colorInterpolationFilters,
        grayscaleType,
        imageOpacity,
        palette,
    ]);

    return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>;
}
