import React, { RefObject } from 'react';
import { useStoreState } from '@/store';

import Filter from './Filter';

import styles from './styles.module.less';

export default function Main({ ref }: { ref: RefObject<SVGSVGElement> }) {
    const { filterId, filter, playgrounds } = useStoreState(({ SVG }) => SVG.filterConfig);
    const base64 = useStoreState(({ common }) => common.base64);

    const { width, height } = { width: 750, height: 1000 };
    const viewBoxValue = [0, 0, width, height];
    return (
        <svg
            ref={ref}
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
    );
}
