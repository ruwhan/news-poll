import React from "react";
import { Route, Switch } from 'react-router' // react-router v4/v5
import Home from "./containers/Home";

export const Routes = () => (
  <> { /* your usual react-router v4/v5 routing */ }
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route render={() => (<div>Miss</div>)} />
    </Switch>
  </>
)

export default Routes;
