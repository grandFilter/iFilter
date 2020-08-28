import React, { useRef } from 'react';

import LayoutEditor from '@/comtainers/Layout/Editor';
import Banner from './Banner';
import Main from './Main';
import Footer from './Footer';

// import imageShrine from '@/assets/images/shrine.jpg';
// console.log(imageShrine);

export default function FilterSVG() {
    const refSVG = useRef<SVGSVGElement>(null);

    const config = {
        Banner: <Banner target={refSVG.current} />,
        Main: <Main ref={refSVG} />,
        Footer: <Footer />,
        // Extra: <div></div>,
    };

    return <LayoutEditor {...config} />;
}
