import React, { useState } from 'react';

// import CarouselIndex from '@/components/Carousel';
import CarouselSlider from '@/components/Carousel/Slider';
import Camera from '@/components/Camera';

import styles from './styles.module.less';

export default function HomeIndex() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            {/* <CarouselIndex /> */}
            {/* <CarouselSlider /> */}
            <button className={styles.button} onClick={() => setVisible(true)}>
                Camera
            </button>
            <Camera visible={visible} onClose={() => setVisible(false)} />
        </>
    );
}
