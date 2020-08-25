import React from 'react';
import { useStoreState, useStoreActions } from '@/store';

import ScrollSnap from '@/components/ScrollSnap';
import Editor from './Editor/index';

import CN from 'classnames';
import styles from './styles.module.less';

export default function Palatte() {
    const { palettes, paletteId } = useStoreState(({ SVG }) => SVG);
    const { setPalatte } = useStoreActions(({ SVG }) => SVG) as any;
    const handlePalatte = (id: string) => setPalatte(id);

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

            <Editor />
        </>
    );
}
