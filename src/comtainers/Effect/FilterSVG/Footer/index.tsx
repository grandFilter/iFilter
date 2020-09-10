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
    const { palettes, paletteId } = useStoreState(({ SVG }) => SVG);
    const { setPalatteId } = useStoreActions(({ SVG }) => SVG) as any;

    const [state, setState] = useState<{
        tab: TYPE_NAME;
        editColor: boolean;
        palette: typeof palettes[0];
    }>({
        tab: TYPE_NAME.Filter,
        editColor: false,
        palette: {
            id: '',
            name: '',
            colors: [],
        },
    });
    const [base64] = useBase64();

    const onSelectAndChangeColor = (
        item: {
            id: string;
            name: string;
            colors: string[];
        },
        index: number,
    ) => {
        if (paletteId === item.id) {
            // 二次点击: 编辑颜色
            setState({
                ...state,
                editColor: true,
                palette: JSON.parse(JSON.stringify(item)), // 初始值，<Color/> 组件用于取消重置
            });
        } else {
            setPalatteId(item.id);
        }
    };

    const palettesList = palettes.map((item, index: number) => {
        return {
            ...item,
            children: (
                <div
                    onClick={() => onSelectAndChangeColor(item, index)}
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
                    value={state.palette}
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
