import React, { FormEvent } from 'react';
import styles from './styles.module.less';

export default function ColorInput({ color, onChange }: { color: string; onChange?: Function }) {
    const handleChange = (color: string) => {
        onChange && onChange(color);
    };

    return (
        <span className={styles.inputColor}>
            <i className={styles.color} data-name={color} style={{ backgroundColor: color }}></i>
            <input
                type="color"
                value={color}
                onChange={(event: FormEvent<HTMLInputElement>) => handleChange(event.currentTarget.value)}
            />
        </span>
    );
}
