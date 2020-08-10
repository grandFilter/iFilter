import React from 'react';
import { useStoreState, useStoreActions } from '@/store';

import styles from './styles.module.less';

export default function EffectGroup() {
    const list = useStoreState(({ effect }) => effect.CSSgramList);
    const setActive = useStoreActions(({ effect }) => effect.setActive);

    const origin = 'https://una.im/CSSgram/img/atx.jpg';

    return (
        <ul className={styles.group}>
            {list.map(({ filter, name }, index) => (
                <li key={index} onClick={() => setActive(index)}>
                    <figure style={{ filter }}>
                        <img src={origin} alt="" width="100%" />
                        <figcaption>{name}</figcaption>
                    </figure>
                </li>
            ))}
        </ul>
    );
}
