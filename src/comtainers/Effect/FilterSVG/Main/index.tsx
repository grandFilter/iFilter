import React, { useContext, forwardRef, DetailedHTMLProps, LegacyRef, SVGAttributes } from 'react';
import { useStoreState } from '@/store';

import { useBase64 } from '@/services/hooks/localforage';

import { FilterContext } from '../FilterContext';

import Filter from './Filter';

import styles from './styles.module.less';

export default forwardRef(MainSvg);

function MainSvg(props: DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>, ref: LegacyRef<SVGSVGElement>) {
    const [{ imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }] = useContext(FilterContext);

    const { getFilterConfig } = useStoreState(({ SVG }) => SVG);

    const [base64] = useBase64();

    const { id = '', filter = {}, playgrounds = [] } =
        getFilterConfig({
            imageOpacity,
            blendMode,
            grayscaleType,
            colorInterpolationFilters,
        }) || {};

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
                <Filter id={id} filter={filter} playgrounds={playgrounds} />
            </defs>
            <g>
                <image xlinkHref={base64} width="100%" height="100%" />
                <image xlinkHref={base64} width="100%" height="100%" filter={`url(#${id})`} />
            </g>
        </svg>
    );
}
