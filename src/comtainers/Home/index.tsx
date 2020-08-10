import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreActions } from '@/store';

// import CarouselIndex from '@/components/Carousel';
// import CarouselSlider from '@/components/Carousel/Slider';
import Camera from '@/components/Camera';

import styles from './styles.module.less';

export default function HomeIndex() {
    const history = useHistory();
    const setBase64 = useStoreActions(({ common }) => common.setBase64);

    const [visible, setVisible] = useState(false);

    const inputHandle = (base64: string) => {
        setBase64(base64);
        history.push('/effect');
    };
    return (
        <>
            {/* <CarouselIndex /> */}
            {/* <CarouselSlider /> */}
            <button className={styles.button} onClick={() => setVisible(true)}>
                Camera
            </button>
            <Camera visible={visible} onClose={() => setVisible(false)} onInput={inputHandle} />
        </>
    );
}
