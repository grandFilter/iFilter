import React from 'react';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import styles from './styles.module.less';

export default function CarouselIndex({ className }: { className?: string }) {
    const [rotation, setRotation] = React.useState(0);

    const [sliderRef] = useKeenSlider({
        slides: 2,
        duration: 1000,
        move(s) {
            const progress = s.details().progressTrack;
            const delta = -progress;
            setRotation(delta * 360);
        },
        loop: true,
    });

    return (
        <header
            style={{
                backgroundImage: `linear-gradient(${rotation}deg, black 0px, black 50%, white 50%, white 100%)`,
            }}
            className={[styles.rotation, className || ''].join(' ')}
            ref={sliderRef}
        >
            <div
                className={styles.inner}
                style={{
                    backgroundImage: `linear-gradient(${rotation}deg, white 0px, white 50%, black 50%, black 100%)`,
                }}
            >
                <span>keen-slider</span>
            </div>
        </header>
    );
}
