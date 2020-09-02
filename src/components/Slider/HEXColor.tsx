import React, { useState, FormEvent } from 'react';

import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import wNumb from 'wnumb';

import { hexToRgb, rgbToHex } from '@/utils/color';

import styles from './styles.module.less';

const COLORS = ['red', 'green', 'blue'];

export default function SliderHEXColor({ color, onChange }: { color: string; onChange?: Function }) {
    const [state, setState] = useState({ rgbs: hexToRgb(color) });

    const updateHandler = (index: number) => (
        values: string[],
        handle: number,
        unencodedValues: number[],
        tap: boolean,
        positions: number[],
    ) => {
        let [value] = unencodedValues;
        const result = state.rgbs as [number, number, number];
        result.splice(index, 1, Math.round(value));

        const hex = rgbToHex(...result);
        setState({ ...state, rgbs: result });

        onChange && onChange(hex);
    };
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setState({ ...state, rgbs: hexToRgb(value) });
        // onChange && onChange(value);
    };
    return (
        <div className={styles.colorSlider}>
            <div className={styles.colorpicker}>
                {COLORS.map((item, index) => (
                    <Nouislider
                        key={item}
                        id={item}
                        className={styles[item]}
                        start={state.rgbs[index]}
                        connect={[true, false]}
                        orientation="vertical"
                        direction="rtl"
                        format={wNumb({ decimals: 0 })}
                        step={1}
                        range={{
                            min: 0,
                            max: 255,
                        }}
                        pips={{
                            mode: 'count',
                            values: 6,
                            density: 5,
                        }}
                        onUpdate={updateHandler(index)}
                    />
                ))}
            </div>
            <div className={styles.result}>
                <input type="color" value={color} onChange={e => handleChange(e)} />
            </div>
        </div>
    );
}
