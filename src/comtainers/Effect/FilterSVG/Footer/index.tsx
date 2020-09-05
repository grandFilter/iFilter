import React, { useState } from 'react';
import { useStoreState, useStoreActions } from '@/store';

import { useBase64 } from '@/services/hooks/localforage';

import ScrollSnap from '@/components/ScrollSnap';
import Editor from './Editor/index';
import Color from './Color';

import CN from 'classnames';
import styles from './styles.module.less';

enum TYPE_NAME {
    Filter = 'Filter',
    Editor = 'Editor',
}

export default function Footer() {
    const [state, setState] = useState({ tab: TYPE_NAME.Filter, editColor: false });
    const [base64] = useBase64();

    const { palettes, paletteId } = useStoreState(({ SVG }) => SVG);
    const { setPalatteId } = useStoreActions(({ SVG }) => SVG) as any;
    const onSelectAndChangeColor = (id: string, index: number) => {
        if (paletteId === id) {
            // 二次点击
            setState({
                ...state,
                editColor: true,
            });
        } else {
            setPalatteId(id);
        }
    };

    const palettesList = palettes.map((item: any, index: number) => {
        return {
            ...item,
            children: (
                <div
                    onClick={() => onSelectAndChangeColor(item.id, index)}
                    className={CN([styles.palette, item.id === paletteId && styles.active])}
                >
                    <h2>{item.name}</h2>
                    <figure>{base64 && <img src={base64} alt="" />}</figure>
                </div>
            ),
        };
    });

    return (
        <div className={styles.wrap}>
            <aside className={styles.area}>
                {(() => {
                    switch (state.tab) {
                        case TYPE_NAME.Filter:
                            return <ScrollSnap list={palettesList} />;
                        case TYPE_NAME.Editor:
                            return <Editor />;
                    }
                })()}
            </aside>
            <ul className={styles.tab}>
                {[TYPE_NAME.Filter, TYPE_NAME.Editor].map(tab => (
                    <li
                        key={tab}
                        className={CN([styles.item, state.tab === tab && styles.active])}
                        onClick={() => setState({ ...state, tab })}
                    >
                        {tab}
                    </li>
                ))}
            </ul>
            {/* change color */}
            {state.editColor && (
                <Color
                    onClose={() =>
                        setState({
                            ...state,
                            editColor: false,
                        })
                    }
                />
            )}
        </div>
    );
}
