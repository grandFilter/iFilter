import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FilterCSS from './FilterCSS';
import FilterSVG from './FilterSVG';

export default function EffectIndex() {
    return (
        <Switch>
            <Route path={`/`}>
                <FilterSVG />
            </Route>
            <Route path={`/css`}>
                <FilterCSS />
            </Route>
            {/* <Route path={`/svg`}>
                <FilterSVG />
            </Route> */}
            <Route path="*">
                <>404</>
            </Route>
        </Switch>
    );
}
