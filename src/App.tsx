import React from 'react';
import { Router, Route, HashRouter /* BrowserRouter */ } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import history from '@/utils/history';

import LayoutIndex from '@/containers/Layout';
import HomeIndex from '@/containers/Home';
import EffectIndex from '@/containers/Effect';

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
                    <HashRouter basename="/">
                        <Route path="/" exact>
                            <HomeIndex />
                        </Route>
                        <Route path="/effect">
                            <EffectIndex />
                        </Route>
                    </HashRouter>
                </LayoutIndex>
            </AnimatedSwitch>
        </Router>
    );
}

export default App;
