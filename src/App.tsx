import React from 'react';
import { Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import history from '@/utils/history';

import LayoutIndex from '@/comtainers/Layout';
import HomeIndex from '@/comtainers/Home';

import styles from './app.module.scss';

function App() {
    return (
        <Router history={history}>
            <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className={styles.switch}
            >
                <LayoutIndex>
                    <Route path="/" exact>
                        <HomeIndex />
                    </Route>
                </LayoutIndex>
            </AnimatedSwitch>
        </Router>
    );
}

export default App;
