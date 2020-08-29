import React from 'react';

import LayoutEditor from '@/comtainers/Layout/Editor';
import Banner from './Banner';
import Main from './Main';
import Footer from './Footer';

import { FilterProvider } from './FilterContext';

// import imageShrine from '@/assets/images/shrine.jpg';
// console.log(imageShrine);

export default function FilterSVG() {
    const config = {
        Banner: <Banner />,
        Main: <Main />,
        Footer: <Footer />,
        // Extra: <div></div>,
    };

    return (
        <FilterProvider>
            <LayoutEditor {...config} />
        </FilterProvider>
    );
}
