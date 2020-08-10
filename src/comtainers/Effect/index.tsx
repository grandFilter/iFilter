import React from 'react';
import Group from './Group';

import { useStoreState } from '@/store';

import styles from './styles.module.less';

export default function EffectIndex() {
    const base64 = useStoreState(({ common }) => common.base64);
    const filter = useStoreState(({ effect }) => effect.activeFilter);
    return (
        <>
            <figure className={styles.figure} style={{ filter }}>
                <img src={base64} alt="" width="100%" />
            </figure>
            <Group />
        </>
    );
}
