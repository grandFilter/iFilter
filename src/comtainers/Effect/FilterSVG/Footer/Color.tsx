import React, { useState, FormEvent } from 'react';
import { useStoreState, useStoreActions } from '@/store';

// import CN from 'classnames';
import styles from './styles.module.less';

export default function Color({ onClose }: { onClose?: Function }) {
    const palette = useStoreState(({ SVG }) => SVG.palette);
    const setPalatte = useStoreActions(({ SVG }) => SVG.setPalatte) as any;

    const [state] = useState({ palette });

    const handleChange = (event: FormEvent<HTMLInputElement>, index: number) => {
        const colors = palette.colors.concat();
        colors.splice(index, 1, event.currentTarget.value);
        // console.log('change', colors);
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

    return (
        <div className={styles.color}>
            {palette.colors.map((color: string, index: number) => {
                return <input type="color" key={index} value={color} onChange={e => handleChange(e, index)} />;
            })}

            <aside className={styles.aside}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDone}>Done</button>
            </aside>
        </div>
    );
}
