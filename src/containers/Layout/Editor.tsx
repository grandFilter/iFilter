import React, { ReactElement } from 'react';

import styles from './styles.module.scss';

export default function LayoutEditor({
    Banner,
    Main,
    Footer,
    Extra,
}: {
    Banner: ReactElement;
    Main: ReactElement;
    Footer: ReactElement;
    Extra?: ReactElement;
}) {
    return (
        <div className={styles.editor}>
            <aside className={styles.banner}>{Banner}</aside>
            <main className={styles.main}>{Main}</main>
            <footer className={styles.footer}>{Footer}</footer>
            {Extra}
        </div>
    );
}
