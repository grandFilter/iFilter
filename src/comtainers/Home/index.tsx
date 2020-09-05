import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useBase64 } from '@/services/hooks/localforage';

// import CarouselIndex from '@/components/Carousel';
// import CarouselSlider from '@/components/Carousel/Slider';
import Camera from '@/components/Camera';
import { CameraIcon } from '@/components/Icon';

import styles from './styles.module.less';

export default function HomeIndex() {
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    const [, setBase64] = useBase64();

    const inputHandle = async (base64: string) => {
        await setBase64(base64);
        history.push('/effect');
    };
    return (
        <>
            {/* <CarouselIndex /> */}
            {/* <CarouselSlider /> */}
            <header className={styles.header}></header>
            <button className={styles.button} onClick={() => setVisible(true)}>
                <CameraIcon className={styles.icon} />
                <br />
                <strong>Camera</strong>
            </button>

            <Camera visible={visible} onClose={() => setVisible(false)} onInput={inputHandle} />
        </>
    );
}
