import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { HomeIcon } from '@/components/Icon';
import ActionSheet, { useActionSheet } from '@/components/ActionSheet';
import { FilterContext } from '../FilterContext';

import { SVGToImage } from '@/utils';

import styles from './styles.module.less';

export default function Banner({ target }: { target: SVGSVGElement | null }) {
    const [{ editing, palette: { name } = { name: '' } }] = useContext(FilterContext);
    const [src, setSrc] = useState('');

    const actionSheetConfig = useActionSheet();

    const onSave = async () => {
        if (!target) return;
        const image = await SVGToImage(target);
        setSrc(image.src);
        actionSheetConfig.onToggle();
        // target.parentElement?.parentElement?.append(image); // TEST
    };
    return (
        <>
            <div className={styles.banner}>
                <Link to="/" className={styles.homeIcon}>
                    <HomeIcon />
                </Link>
                <div className={styles.center}>{name}</div>
                <div className={styles.right}>
                    {!editing && (
                        <button className={styles.save} onClick={() => onSave()}>
                            Save
                        </button>
                    )}
                </div>
            </div>
            <ActionSheet {...actionSheetConfig}>
                <figure className={styles.resultFigure}>
                    <figcaption>长安保存图片</figcaption>
                    <img src={src} alt="" width="100%" />
                </figure>
            </ActionSheet>
        </>
    );
}
