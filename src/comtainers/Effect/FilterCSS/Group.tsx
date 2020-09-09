import React, { useState } from 'react';
import CN from 'classnames';
import { useStoreState, useStoreActions } from '@/store';
import { useBase64 } from '@/services/hooks/localforage';

import SliderIndex from '@/components/Slider';

import styles from './styles.module.less';
import filterStyles from './filter.module.less';

export default function FilterCSSGroup({ onInput, opacity }: { onInput?: Function; opacity: number }) {
    const { opacity: originOpacity } = useStoreState(({ effect }) => effect.activeFilter);

    const [base64] = useBase64();
    const list = useStoreState(({ effect }) => effect.CSSgramList);
    const active = useStoreState(({ effect }) => effect.active);

    const setActive = useStoreActions(({ effect }) => effect.setActive);

    const setOpacity = useStoreActions(({ effect }) => effect.setOpacity);

    const [strength, setStrength] = useState(false);

    const onSelectAndEdit = (index: number, opacity: number) => {
        if (active === index) {
            setOpacity(opacity);
            setStrength(true);
        } else {
            setActive(index);
        }
    };

    const onUpdate = (opacity: number) => {
        // setOpacity(opacity);
        onInput && onInput(opacity);
    };

    const onDone = () => {
        setOpacity(opacity);
        console.log('onDone', opacity);
        setStrength(false);
    };
    const onCancel = () => {
        setStrength(false);
        setOpacity(100);
    };

    return (
        <>
            <ul className={styles.list}>
                {list.map(({ name, className, opacity }, index) => (
                    <li
                        key={index}
                        onClick={() => onSelectAndEdit(index, opacity)}
                        className={CN([styles.item, active === index && styles.active])}
                    >
                        <h2>{name}</h2>
                        <div className={styles.filter}>
                            {base64 && (
                                <figure className={CN([filterStyles[className]])}>
                                    <img src={base64} alt="" />
                                </figure>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {strength && (
                <div className={styles.layer}>
                    <div className={styles.slider}>
                        <SliderIndex value={originOpacity} onUpdate={onUpdate} />
                    </div>
                    <aside className={styles.aside}>
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={onDone}>Done</button>
                    </aside>
                </div>
            )}
        </>
    );
}
