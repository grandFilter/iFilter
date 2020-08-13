import React from 'react';
import CN from 'classnames';
import { useStoreState, useStoreActions } from '@/store';

import styles from './styles.module.less';

export default function EffectGroup() {
    const list = useStoreState(({ effect }) => effect.CSSgramList);
    const active = useStoreState(({ effect }) => effect.active);
    const setActive = useStoreActions(({ effect }) => effect.setActive);

    const origin = 'https://una.im/CSSgram/img/atx.jpg';

    return (
        <ul className={styles.group}>
            {list.map(({ name, filter, after = {}, before = {} }, index) => (
                <li key={index} onClick={() => setActive(index)} className={CN([active === index && styles.active])}>
                    <h2>{name}</h2>
                    <figure style={{ filter }}>
                        <i className={styles.before} style={before}></i>
                        <img src={origin} alt="" width="100%" />
                        <i className={styles.after} style={after}></i>
                        {/* <figcaption>#{name}</figcaption> */}
                    </figure>
                </li>
            ))}
        </ul>
    );
}