import React, { useState } from 'react';

import { SVG_EDITOR_TYPE } from '@/constants';

import ScrollSnap from '@/components/ScrollSnap';
import { TransparencyIcon } from '@/components/Icon';

import Operator from './Operator';

// import CN from 'classnames';
import styles from './styles.module.less';

const actionList = [
    { type: SVG_EDITOR_TYPE.Transparency, icon: <TransparencyIcon /> },
    { type: SVG_EDITOR_TYPE.Blend, icon: <TransparencyIcon /> },
    { type: SVG_EDITOR_TYPE.Channel, icon: <TransparencyIcon /> },
    { type: SVG_EDITOR_TYPE.Interpolation, icon: <TransparencyIcon /> }, // color-interpolation-filters
];

export default function SVGEditor() {
    const [state, setState] = useState({ editing: false, type: '' });

    const handleSelect = (type: string) => setState({ ...state, editing: true, type });
    const list = actionList.map(item => {
        return {
            ...item,
            children: (
                <div className={styles.iconWrap} onClick={() => handleSelect(item.type)}>
                    <h2>{item.type}</h2>
                    <span className={styles.icon}>{item.icon}</span>
                </div>
            ),
        };
    });

    return (
        <>
            <aside className={styles.eidtor}>
                <ScrollSnap list={list} />
            </aside>
            {state.editing && <Operator type={state.type} onClose={() => setState({ ...state, editing: false })} />}
        </>
    );
}
