import React, { useState } from 'react';

import InputColor from '@/components/Input/Color';

import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import wNumb from 'wnumb';

import { hexToRgb, rgbToHex } from '@/utils/color';

import styles from './styles.module.less';

const COLORS = ['red', 'green', 'blue'];

export default function SliderHEXColor({ color, onChange }: { color: string; onChange?: Function }) {
    const [rgbs, setState] = useState(hexToRgb(color));

    // 实时效果
    const handleUpdate = (index: number) => (
        values: string[],
        handle: number,
        unencodedValues: number[],
        tap: boolean,
        positions: number[],
    ) => {
        let [value] = unencodedValues;
        // 临时变量， copy 一份，消除对当前 state 的副作用
        const cache = rgbs.concat() as [number, number, number];
        cache[index] = Math.round(value);
        onChange && onChange(rgbToHex(...cache));
    };

    const sliderChangeHandler = (index: number) => (
        values: string[],
        handle: number,
        unencodedValues: number[],
        tap: boolean,
        positions: number[],
    ) => {
        let [value] = unencodedValues;
        rgbs[index] = Math.round(value);
        setState(rgbs);
        onChange && onChange(rgbToHex(...rgbs));
    };

    const handleChange = (color: string) => {
        const [r, g, b] = hexToRgb(color);
        rgbs[0] = r;
        rgbs[1] = g;
        rgbs[2] = b;

        setState(rgbs);

        onChange && onChange(color);
    };

    return (
        <div className={styles.colorSlider}>
            <h2 className={styles.titleWrap}>
                <strong>{color.toLocaleUpperCase()}</strong>
                <span>
                    <InputColor color={color} onChange={(value: string) => handleChange(value)} />
                </span>
            </h2>
            <div className={styles.colorpicker}>
                {COLORS.map((item, index) => (
                    <Nouislider
                        key={item}
                        id={item}
                        className={styles[item]}
                        start={rgbs[index]}
                        connect={[true, false]}
                        orientation="vertical"
                        direction="rtl"
                        format={wNumb({ decimals: 0 })}
                        step={1}
                        range={{
                            min: 0,
                            max: 255,
                        }}
                        data-pips={{
                            mode: 'count',
                            values: 6,
                            density: 5,
                        }}
                        onUpdate={handleUpdate(index)}
                        onChange={sliderChangeHandler(index)}
                    />
                ))}
            </div>
        </div>
    );
}
