import React, { useContext, useRef } from 'react';
import { useStoreState } from '@/store';

import { FilterContext } from '../FilterContext';

import Filter from './Filter';

import styles from './styles.module.less';

export default function Main() {
    const refSVG = useRef<SVGSVGElement>(null);

    const [{ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }] = useContext(FilterContext);

    const { paletteId, getFilterConfig } = useStoreState(({ SVG }) => SVG);
    const base64 = useStoreState(({ common }) => common.base64);

    const { id, filter, playgrounds } = getFilterConfig({
        paletteId,
        imageOpacity,
        blendMode,
        grayscaleType,
        colorInterpolationFilters,
    });

    const { width, height } = { width: 750, height: 1000 };
    const viewBoxValue = [0, 0, width, height];
    return (
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
                <Filter id={id} filter={filter} playgrounds={playgrounds} />
            </defs>
            <g>
                <image xlinkHref={base64} width="100%" height="100%" />
                <image xlinkHref={base64} width="100%" height="100%" filter={`url(#${id})`} />
            </g>
        </svg>
    );
}
