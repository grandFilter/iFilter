import React from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import history from '@/utils/history';

import LayoutIndex from '@/comtainers/Layout';
import HomeIndex from '@/comtainers/Home';
import EffectIndex from '@/comtainers/Effect';

import styles from './app.module.less';

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
                    <BrowserRouter basename="/wjy/a">
                        <Route path="/" exact>
                            <HomeIndex />
                        </Route>
                        <Route path="/effect">
                            <EffectIndex />
                        </Route>
                    </BrowserRouter>
                </LayoutIndex>
            </AnimatedSwitch>
        </Router>
    );
}

export default App;
