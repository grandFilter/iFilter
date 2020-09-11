import React from 'react';
import { SVGToImage } from '@/utils';
// import { ICallback } from '@/types';

import styles from './styles.module.less';

export default function Banner({ target }: { target: SVGSVGElement | null }) {
    const onSave = async () => {
        if (!target) return;
        const image = await SVGToImage(target);
        target.parentElement?.parentElement?.append(image); // TEST
    };
    return (
        <div className={styles.banner}>
            <div className={styles.center}>#TODO#</div>
            <div className={styles.right}>
                <button className={styles.save} onClick={() => onSave()}>
                    Done
                </button>
            </div>
        </div>
    );
}
