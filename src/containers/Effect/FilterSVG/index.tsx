import React, { useState, useRef, useEffect } from 'react';

import LayoutEditor from '@/containers/Layout/Editor';
import Banner from './Banner';
import Main from './Main';
import Footer from './Footer';

import { FilterProvider } from './FilterContext';

export default function FilterSVG() {
    const refSVG = useRef<SVGSVGElement>(null);
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        if (refSVG.current) {
            setState(refSVG.current);
        }
    }, []);

    const config = {
        Banner: <Banner target={state} />,
        Main: <Main ref={refSVG} />,
        Footer: <Footer />,
        // Extra: <div></div>,
    };

    return (
        <FilterProvider>
            <LayoutEditor {...config} />
        </FilterProvider>
    );
}
