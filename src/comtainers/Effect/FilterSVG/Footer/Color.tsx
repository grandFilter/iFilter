import React, { useState } from 'react';
import { useStoreState, useStoreActions } from '@/store';

import SliderHEXColor from '@/components/Slider/HEXColor';
import ScrollSnap from '@/components/ScrollSnap';

// import CN from 'classnames';
import styles from './styles.module.less';

export default function Color({ onClose }: { onClose?: Function }) {
    const palette = useStoreState(({ SVG }) => SVG.palette);
    const setPalatte = useStoreActions(({ SVG }) => SVG.setPalatte) as any;

    const [state] = useState({ palette });

    const handleChange = (value: string, index: number) => {
        // console.log('change', colors);
        const colors = state.palette?.colors.concat();

        colors?.splice(index, 1, value);

        setPalatte({
            ...state.palette,
            colors,
        });
    };

    const onDone = () => {
        // console.log('onDone');
        onClose && onClose();
    };
    const onCancel = () => {
        // console.log('onCancel');
        setPalatte(state.palette);
        onClose && onClose();
    };

    const list =
        palette?.colors.map((color: string, index: number) => {
            return {
                color,
                children: (
                    <div>
                        <h2 style={{ margin: 0, textAlign: 'center' }}>{color}</h2>
                        <SliderHEXColor color={color} onChange={(value: string) => handleChange(value, index)} />
                    </div>
                ),
            };
        }) || [];

    return (
        <div className={styles.color}>
            <ScrollSnap list={list} />
            <aside className={styles.aside}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDone}>Done</button>
            </aside>
        </div>
    );
}
