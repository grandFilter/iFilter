import React, { useContext } from 'react';
import { FilterContext } from '../FilterContext';

import { SVGToImage } from '@/utils';

import styles from './styles.module.less';

export default function Banner({ target }: { target: SVGSVGElement | null }) {
    const [{ palette }] = useContext(FilterContext);

    const { name = '' } = palette ?? {};

    const onSave = async () => {
        if (!target) return;
        const image = await SVGToImage(target);
        target.parentElement?.parentElement?.append(image); // TEST
    };
    return (
        <div className={styles.banner}>
            <div className={styles.center}>{name}</div>
            <div className={styles.right}>
                <button className={styles.save} onClick={() => onSave()}>
                    Done
                </button>
            </div>
        </div>
    );
}
