import React from 'react';

import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import wNumb from 'wnumb';

// import { ICallback } from '@/types';
import styles from './styles.module.less';

export default function SliderIndex({ initValue = 100, onUpdate }: { initValue?: number; onUpdate?: Function }) {
    const updateHandler = (
        values: string[],
        handle: number,
        unencodedValues: number[],
        tap: boolean,
        positions: number[],
    ) => {
        const [val = 100] = unencodedValues;

        // console.log(val);
        onUpdate && onUpdate(val / 100);
    };

    return (
        <>
            <Nouislider
                className={styles.slider}
                step={1}
                range={{ min: 0, max: 100 }}
                start={[initValue * 100]}
                tooltips={true}
                format={wNumb({ decimals: 0 })}
                connect={[true, false]}
                onUpdate={updateHandler}
            />
        </>
    );
}
