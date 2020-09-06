import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

export default function LayoutIndex(props: { children?: ReactNode }) {
    const { children } = props;
    return <main className={styles.layout}>{children}</main>;
}
