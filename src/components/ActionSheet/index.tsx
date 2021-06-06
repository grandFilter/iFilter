import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Assign } from 'utility-types';
import styles from './styles.module.less';

function Portal({ children, rootId }: { children: React.ReactNode; rootId?: string }) {
    const findElem = rootId && document.getElementById(rootId);
    const root = findElem || document.body;
    return createPortal(children, root);
}

/**
 *
 *
 * @param {{}} props
 * @param {boolean} props.visible - 是否展示
 * @param {boolean} props.children - 子组件
 * @param {Function} props.onClose - 关闭方法
 * @return {*}
 */
export default function ActionSheet({
    visible,
    children,
    onClose,
}: Assign<
    {
        children: React.ReactNode;
    },
    ReturnType<typeof useActionSheet>
>) {
    return !visible ? null : (
        <Portal>
            <div className={styles.mask} onClick={onClose}></div>
            <div className={styles.modal}>
                <div className={styles.modalBox}>{children}</div>
            </div>
        </Portal>
    );
}

/**
 *
 *
 * @export
 * @return {*}
 */
export function useActionSheet() {
    const [visible, setVisible] = useState(false);

    const onToggle = useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    const handleEscape = useCallback(
        (event: KeyboardEvent) => {
            if (event.code === 'Escape') onToggle();
        },
        [onToggle],
    );

    useEffect(() => {
        if (visible) {
            document.addEventListener('keydown', handleEscape, false);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape, false);
        };
    }, [visible, handleEscape]);

    return {
        visible,
        onClose: onToggle,
        onToggle,
    };
}
