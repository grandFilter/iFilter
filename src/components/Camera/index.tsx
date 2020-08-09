import React from 'react';
import { Assign } from 'utility-types';
import CN from 'classnames';
import styles from './styles.module.less';

const getUserMedia =
    navigator.getUserMedia ||
    (navigator as Assign<typeof navigator, { webkitGetUserMedia: any }>).webkitGetUserMedia ||
    (navigator as Assign<typeof navigator, { mozGetUserMedia: any }>).mozGetUserMedia ||
    (navigator as Assign<typeof navigator, { msGetUserMedia: any }>).msGetUserMedia;

export default function CameraIndex(props: { visible: boolean; onClose: Function }) {
    const { visible, onClose } = props;
    const close = () => onClose();
    return (
        <div className={CN([styles.camera, visible ? styles.show : ''])}>
            <div className={styles.mask}></div>
            <span role="button" className={styles.close} onClick={close}>
                &times;
            </span>
            <button className={styles.icon}>
                <input type="file" accept="image/*" />
            </button>
            <button className={styles.shot}></button>
        </div>
    );
}
