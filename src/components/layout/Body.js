import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from '../../pages/Routes';
import Error from '../../pages/Error';
import Signin from '../Auth/Signin'

export default function Body() {
    return (
        <div>
            <Switch>
                {Routes.map((prop) => {
                    //console.log(prop);
                    return (
                        <Route path={prop.path} exact component={prop.component} key={prop.path}>
                            <prop.component />
                        </Route>
                    )
                })}
                <Route path='/signin' component={Signin} />

                {/*must to be in the buttom*/}
                <Route component={Error} />
            </Switch>
        </div>
    )
}