import React from 'react';

// import CN from 'classnames';
import styles from './styles.module.less';

export default function Color({ onClose }: { onClose?: Function }) {
    const onDone = () => {
        // console.log('onDone');
        onClose && onClose();
    };
    const onCancel = () => {
        // console.log('onCancel');

        onClose && onClose();
    };
    return (
        <div className={styles.color}>
            <input type="color" />

            <input type="color" />

            <aside className={styles.aside}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDone}>Done</button>
            </aside>
        </div>
    );
}
