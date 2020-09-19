import React, { useState, useContext } from 'react';

import { SVG_EDITOR_TYPE } from '@/constants';

import ScrollSnap from '@/components/ScrollSnap';
import { BrightnessIcon, BlendIcon, ChannelIcon, InterpolarionIcon } from '@/components/Icon';

import Operator from './Operator';
import { FilterContext } from '../../FilterContext';

// import CN from 'classnames';
import styles from './styles.module.less';

const actionList = [
    { type: SVG_EDITOR_TYPE.Transparency, icon: <BrightnessIcon /> },
    { type: SVG_EDITOR_TYPE.Blend, icon: <BlendIcon /> },
    { type: SVG_EDITOR_TYPE.Channel, icon: <ChannelIcon /> },
    { type: SVG_EDITOR_TYPE.Interpolation, icon: <InterpolarionIcon /> }, // color-interpolation-filters
];

export default function SVGEditor() {
    const [, setCtx] = useContext(FilterContext);

    const [state, setState] = useState({ editing: false, type: '' });

    const handleSelect = (type: string) => {
        setCtx({ editing: true });
        setState({ ...state, editing: true, type });
    };
    const handleClose = () => {
        setCtx({ editing: false });
        setState({ ...state, editing: false });
    };
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
            {state.editing && <Operator type={state.type} onClose={handleClose} />}
        </>
    );
}
