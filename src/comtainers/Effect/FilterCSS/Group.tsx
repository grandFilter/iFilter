import React from 'react';
import CN from 'classnames';
import { useStoreState, useStoreActions } from '@/store';

import styles from './styles.module.less';
import filterStyles from './filter.module.less';
import sample01 from '@/assets/images/sample/01.jpg';

export default function FilterCSSGroup() {
    const list = useStoreState(({ effect }) => effect.CSSgramList);
    const active = useStoreState(({ effect }) => effect.active);
    const setActive = useStoreActions(({ effect }) => effect.setActive);

    return (
        <ul className={styles.list}>
            {list.map(({ name, className }, index) => (
                <li
                    key={index}
                    onClick={() => setActive(index)}
                    className={CN([styles.item, active === index && styles.active])}
                >
                    <h2>{name}</h2>
                    <div className={styles.filter}>
                        <figure className={CN([filterStyles[className]])}>
                            <img src={sample01} alt="" width="100%" />
                        </figure>
                    </div>
                </li>
            ))}
        </ul>
    );
}
