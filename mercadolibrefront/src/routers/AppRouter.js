import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SearchBarScreen, NotFoundScreen, ItemDetailScreen, ItemsScreen } from "../components/";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/items" component={ItemsScreen} />
        <Route exact path="/item/:id" component={ItemDetailScreen} />
        <Route exact path="/" component={SearchBarScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </Router>
  );
};
