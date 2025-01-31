import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

import FilterCSS from './FilterCSS';
import FilterSVG from './FilterSVG';

export default function EffectIndex() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/css`}>
                <FilterCSS />
            </Route>
            <Route path={`${path}/svg`}>
                <FilterSVG />
            </Route>
            <Route path={`${path}/`} exact>
                <Redirect to={`${path}/svg`} />
            </Route>
            <Route path="*">
                <>404</>
            </Route>
        </Switch>
    );
}
