import React, { useState } from 'react';
import CN from 'classnames';
import FilterCSSGroup from './Group';

import { useStoreState } from '@/store';

import styles from './styles.module.less';
import filterStyles from './filter.module.less';

export default function FilterCSSIndex() {
    const base64 = useStoreState(({ common }) => common.base64);
    const { className, opacity: originOpacity } = useStoreState(({ effect }) => effect.activeFilter);

    const [opacity, setOpacity] = useState(originOpacity);

    return (
        <>
            <div className={styles.filter}>
                <picture>
                    <img src={base64} alt="" />
                    <figure className={CN([filterStyles[className]])} style={{ opacity }}>
                        <img src={base64} alt="" />
                    </figure>
                </picture>
            </div>

            <aside className={styles.group}>
                <FilterCSSGroup opacity={opacity} onInput={setOpacity} />
            </aside>
        </>
    );
}
