import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import styles from './styles.module.less';

export default function CarouselSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [pause, setPause] = useState(false);
    const timer = React.useRef() as any;
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        duration: 2000,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide);
        },
        dragStart: () => setPause(true),
        dragEnd: () => setPause(false),
    });

    useEffect(() => {
        sliderRef.current?.addEventListener('mouseover', () => {
            setPause(true);
        });
        sliderRef.current?.addEventListener('mouseout', () => {
            setPause(false);
        });
    }, [sliderRef]);

    useEffect(() => {
        timer.current = setInterval(() => {
            if (!pause && slider) {
                slider.next();
            }
        }, 5000);
        return () => {
            clearInterval(timer.current);
        };
    }, [pause, slider]);

    return (
        <aside className={styles.sliderWap}>
            <header ref={sliderRef} className={['keen-slider', styles.slider].join(' ')}>
                {Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <div key={index} className={['keen-slider__slide', styles.item].join(' ')}>{index + 1}</div>
                    ))}
            </header>
            <div className={styles.mask}>
                {slider && (
                    <div className={styles.dots}>
                        {[...Array(slider.details().size).keys()].map(idx => {
                            return (
                                <span
                                    key={idx}
                                    onClick={() => {
                                        slider.moveToSlideRelative(idx);
                                    }}
                                    className={[styles.dot, currentSlide === idx ? styles.active : ''].join(' ')}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </aside>
    );
}
