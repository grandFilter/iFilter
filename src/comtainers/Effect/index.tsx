import React from 'react';
import Group from './Group';

import { useStoreState } from '@/store';

import styles from './styles.module.less';

export default function EffectIndex() {
    const base64 = useStoreState(({ common }) => common.base64);
    const { filter, after, before } = useStoreState(({ effect }) => effect.activeFilter);
    return (
        <>
            <figure className={styles.figure} style={{ filter }}>
                <i className={styles.before} style={before}></i>
                <img src={base64} alt="" width="100%" />
                <i className={styles.after} style={after}></i>
            </figure>
            <Group />
        </>
    );
}
