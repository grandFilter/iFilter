import React, { useState } from 'react';
import { useStoreState, useStoreActions } from '@/store';

import ScrollSnap from '@/components/ScrollSnap';
import Editor from './Editor/index';

import CN from 'classnames';
import styles from './styles.module.less';

enum TYPE_NAME {
    Filter = 'Filter',
    Editor = 'Editor',
}

export default function Palatte() {
    const [state, setState] = useState({ tab: TYPE_NAME.Filter });

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
        </div>
    );
}
