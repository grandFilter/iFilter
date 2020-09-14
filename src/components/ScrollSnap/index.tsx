import React from 'react';

import CN from 'classnames';
import styles from './styles.module.less';

export default function ScrollSnap({ list }: { list: any[] }) {
    const handleSelect = (item: any, index: number) => {};
    return (
        <div className={styles.scrollWrap}>
            <ul className={styles.scroll}>
                {list.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item, index)} className={CN([styles.item, styles.cl])}>
                        {item.children}
                    </li>
                ))}
            </ul>
        </div>
    );
}
