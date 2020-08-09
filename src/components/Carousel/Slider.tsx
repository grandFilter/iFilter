import React, { RefObject } from 'react';
import { useKeenSlider } from 'keen-slider/react';

import "keen-slider/keen-slider.min.css";
import styles from './styles.module.less';


export default function CarouselSlider() {
    const [pause, setPause] = React.useState(false);
    const timer = React.useRef() as any;
    const [sliderRef, slider]: [RefObject<any>, any] = useKeenSlider({
        loop: true,
        duration: 2000,
        dragStart: () => {
            setPause(true);
        },
        dragEnd: () => {
            setPause(false);
        },
    });

    React.useEffect(() => {
        sliderRef.current.addEventListener('mouseover', () => {
            setPause(true);
        });
        sliderRef.current.addEventListener('mouseout', () => {
            setPause(false);
        });
    }, [sliderRef]);

    React.useEffect(() => {
        timer.current = setInterval(() => {
            if (!pause && slider) {
                slider.next();
            }
        }, 2000);
        return () => {
            clearInterval(timer.current);
        };
    }, [pause, slider]);

    return (
        <div className={styles.slider}>
            <div ref={sliderRef} className="keen-slider slider">
                <div className="keen-slider__slide number-slide1">1</div>
                <div className="keen-slider__slide number-slide2">2</div>
                <div className="keen-slider__slide number-slide3">3</div>
                <div className="keen-slider__slide number-slide4">4</div>
                <div className="keen-slider__slide number-slide5">5</div>
                <div className="keen-slider__slide number-slide6">6</div>
            </div>
        </div>
    );
}
