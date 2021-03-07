import React, { useState } from 'react';
import CN from 'classnames';
import FilterCSSGroup from './Group';

import { useStoreState } from '@/store';
import { useBase64 } from '@/services/hooks/localforage';

import styles from './styles.module.less';
import filterStyles from './filter.module.less';

export default function FilterCSSIndex() {
    const [base64] = useBase64();
    const { className, opacity: originOpacity } = useStoreState(({ effect }) => effect.activeFilter);

    const [opacity, setOpacity] = useState(originOpacity);

    return (
        <>
            <div className={styles.filter}>
                {base64 && (
                    <picture>
                        <img src={base64} alt="" />
                        <figure className={CN([filterStyles[className]])} style={{ opacity }}>
                            <img src={base64} alt="" />
                        </figure>
                    </picture>
                )}
            </div>

            <aside className={styles.group}>
                <FilterCSSGroup opacity={opacity} onInput={setOpacity} />
            </aside>
        </>
    );
}
