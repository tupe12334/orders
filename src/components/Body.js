import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from '../pages/Routes';

export default function Body() {
    return (
        <div>
            <Switch>
                {Routes.map((prop) => {
                    return (
                        <Route path={prop.path} exact component={prop.component}>
                            <prop.component />
                        </Route>
                    )
                })}
                <Route component={Error} />
            </Switch>
        </div>
    )
}