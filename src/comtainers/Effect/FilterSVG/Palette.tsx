import React, { FormEvent } from 'react';
import { useStoreState, useStoreActions } from '@/store';

import ScrollSnap from '@/components/ScrollSnap';

import CN from 'classnames';
import styles from './styles.module.less';

export default function Palatte() {
    const {
        palettes,
        paletteId,
        filterConfig: {
            imageOpacity,
            blendMode,
            grayscaleType,
            filter: { colorInterpolationFilters },
        },
        blendModeList,
        typesList,
        colorTypeList,
    } = useStoreState(({ SVG }) => SVG);
    const { setPalatte, setOpacity, setBlendMode, setGrayscaleType, setColorInterpolationFilters } = useStoreActions(
        ({ SVG }) => SVG,
    ) as any;
    const handlePalatte = (id: string) => setPalatte(id);
    const handleOpacity = (event: FormEvent<HTMLInputElement>) => setOpacity(event.currentTarget.value);
    const handleBlendMode = (event: FormEvent<HTMLSelectElement>) => setBlendMode(event.currentTarget.value);
    const handleGrayscaleType = (event: FormEvent<HTMLSelectElement>) => setGrayscaleType(event.currentTarget.value);
    const handleColorInterpolationFilters = (event: FormEvent<HTMLSelectElement>) =>
        setColorInterpolationFilters(event.currentTarget.value);

    const base64 = useStoreState(({ common }) => common.base64);

    const palettesList = palettes.map((item: any) => {
        return {
            ...item,
            children: (
                <div
                    onClick={() => handlePalatte(item.id)}
                    className={CN([styles.palette, item.id === paletteId && styles.active])}
                >
                    <h2>{item.name}</h2>
                    <figure>
                        <img src={base64} alt="" />
                    </figure>
                </div>
            ),
        };
    });

    return (
        <>
            <ScrollSnap list={palettesList} />
            <label>
                <span>Opacity</span>
                <input type="number" step=".05" min="0" max="1" onChange={handleOpacity} value={imageOpacity} />
            </label>
            <label>
                <span>blend</span>
                <select onChange={handleBlendMode} value={blendMode}>
                    {blendModeList.map((name: string) => {
                        return (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        );
                    })}
                </select>
            </label>

            <label>
                <span>Grayscale by channel</span>
                <select onChange={handleGrayscaleType} value={grayscaleType}>
                    {typesList.map(({ name, id }: any) => {
                        return (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        );
                    })}
                </select>
            </label>

            <label>
                <span>color-interpolation-filters</span>
                <select onChange={handleColorInterpolationFilters} value={colorInterpolationFilters}>
                    {colorTypeList.map((name: string) => {
                        return (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        );
                    })}
                </select>
            </label>
        </>
    );
}
