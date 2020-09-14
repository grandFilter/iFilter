import React, { useState, useContext, forwardRef, DetailedHTMLProps, LegacyRef, SVGAttributes } from 'react';
import { useStoreState } from '@/store';
import { FilterContext } from '../FilterContext';

import Filter from '@/components/SVGFilter';

import styles from './styles.module.less';

export default forwardRef(MainSvg);

function MainSvg(props: DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>, ref: LegacyRef<SVGSVGElement>) {
    const [{ base64, palette, imageOpacity, blendMode, grayscaleType, colorInterpolationFilters }] = useContext(
        FilterContext,
    );

    const { palatteFilters, getFilterConfig } = useStoreState(({ SVG }) => SVG);

    const { id = '', filter = {}, playgrounds = [] } =
        getFilterConfig({
            palette,
            imageOpacity,
            blendMode,
            grayscaleType,
            colorInterpolationFilters,
        }) || {};

    const { width, height } = { width: 750, height: 1000 };
    const viewBoxValue = [0, 0, width, height];

    const [hasOrigin, setHasOrigin] = useState(false);
    const hanleStart = () => setHasOrigin(true);
    const handleEnd = () => setHasOrigin(false);
    return (
        <>
            <svg
                onTouchStart={hanleStart}
                onTouchEnd={handleEnd}
                onMouseDown={hanleStart}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
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
                    {/* thumbnail filter */}
                    {palatteFilters.map(({ filterId, filter, playgrounds }) => (
                        <Filter key={filterId} id={filterId} filter={filter} playgrounds={playgrounds} />
                    ))}
                    {/* live filter */}
                    <Filter id={hasOrigin ? `${id}.` : id} filter={filter} playgrounds={playgrounds} />
                </defs>
                <g>
                    <image xlinkHref={base64} width="100%" height="100%" />
                    <image xlinkHref={base64} width="100%" height="100%" filter={`url(#${id})`} />
                </g>
            </svg>
        </>
    );
}
