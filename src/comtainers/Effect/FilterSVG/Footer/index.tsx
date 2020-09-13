import React, { useState, useContext } from 'react';
import { useStoreState, useStoreActions } from '@/store';

import { FilterContext } from '../FilterContext';

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
    const { palettes, paletteId, palatteFilters } = useStoreState(({ SVG }) => SVG);
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

    const [{ thumbnail }] = useContext(FilterContext);

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

    const palettesList = palatteFilters.map(({ filterId, palette }, index: number) => {
        return {
            ...palette,
            children: (
                <div
                    onClick={() => onSelectAndChangeColor(palette, index)}
                    className={CN([styles.palette, palette.id === paletteId && styles.active])}
                >
                    <h2>{palette.name}</h2>
                    <figure>
                        {thumbnail && <img src={thumbnail} alt="" style={{ filter: `url(#${filterId})` }} />}
                    </figure>
                </div>
            ),
        };
    });

    return (
        <div className={styles.wrap}>
            {/* thumbnail slider */}
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
            {/* TAB */}
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
