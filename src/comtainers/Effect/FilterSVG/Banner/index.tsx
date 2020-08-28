import React from 'react';

// import { ICallback } from '@/types';

import styles from './styles.module.less';

export default function Banner({ target }: { target: SVGSVGElement | null }) {
    return (
        <>
            <button className={styles.save} onClick={() => onSave(target)}>
                SAVE
            </button>
        </>
    );
}

//--------------------------------------
// test
async function onSave(svgElem: SVGSVGElement | null) {
    if (!svgElem) return;

    const svgString = new XMLSerializer().serializeToString(svgElem);

    const svgUrl = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
    // const svgUrl = URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' }));

    const image = new Image();
    image.src = svgUrl;
    image.onload = () => {
        const { width: sWidth, height: sHeight } = image;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = sWidth;
        canvas.height = sHeight;
        canvas.style.width = '100%';
        ctx?.drawImage(image, 0, 0);
        svgElem.parentElement?.parentElement?.append(canvas);
    };
}
