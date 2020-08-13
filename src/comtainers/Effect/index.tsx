import React, { useRef, useState, useEffect } from 'react';
import Group from './Group';

import { useStoreState } from '@/store';

import { loadImage } from '@/utils';

import styles from './styles.module.less';

export default function EffectIndex() {
    const base64 = useStoreState(({ common }) => common.base64);
    const { filter, after = {}, before = {} } = useStoreState(({ effect }) => effect.activeFilter);

    const canvasRef = useRef<HTMLCanvasElement>(null),
        canvas = canvasRef.current;

    const [config, setConfig] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        (async () => {
            const image = await loadImage(base64);
            const { width, height } = image;
            setConfig({ ...config, width, height });

            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(image, 0, 0, width, height);
        })();
    });

    return (
        <>
            <figure className={styles.figure} style={{ filter }}>
                <i className={styles.before} style={before}></i>
                <img src={base64} alt="" width="100%" />
                <i className={styles.after} style={after}></i>
            </figure>
            <canvas className={styles.canvas} ref={canvasRef} height={config.height} width={config.width} />
            <Group />
        </>
    );
}
