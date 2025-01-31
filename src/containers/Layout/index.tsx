import React, { ReactNode } from 'react';

import styles from './styles.module.less';

export default function LayoutIndex(props: { children?: ReactNode }) {
    const { children } = props;
    return (
        <main className={styles.layout}>
            <div className={styles.box}>{children}</div>
        </main>
    );
}
