import React, { useRef } from 'react';
import { useStoreState } from '@/store';

import LayoutEditor from '@/comtainers/Layout/Editor';

import Filter from './Filter';
import Palette from './Palette';

import styles from './styles.module.less';
// import imageShrine from '@/assets/images/shrine.jpg';
// console.log(imageShrine);

export default function FilterSVG() {
    const refSVG = useRef<SVGSVGElement>(null);
    const { filterId, filter, playgrounds } = useStoreState(({ SVG }) => SVG.filterConfig);
    const base64 = useStoreState(({ common }) => common.base64);

    const { width, height } = { width: 750, height: 1000 };
    const viewBoxValue = [0, 0, width, height];

    const config = {
        Banner: (
            <button className={styles.save} onClick={() => onSave(refSVG.current)}>
                SAVE
            </button>
        ),
        Main: (
            <svg
                ref={refSVG}
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid slice"
                viewBox={viewBoxValue.join(' ')}
                width={width}
                height={height}
            >
                <defs>
                    <Filter id={filterId} filter={filter} playgrounds={playgrounds} />
                </defs>
                <g>
                    <image xlinkHref={base64} width="100%" height="100%" />
                    <image xlinkHref={base64} width="100%" height="100%" filter={`url(#${filterId})`} />
                </g>
            </svg>
        ),
        Footer: <Palette />,
        // Extra: <div></div>,
    };

    return <LayoutEditor {...config} />;
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
