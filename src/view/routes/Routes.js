import React from "react";
import {Route, Switch} from "react-router-dom";
import {PATH_ADD_LIST, PATH_HOME, PATH_ITEM_LIST} from "../../constants/ConstantsPath";
import Home from "../pages/Home";
import AddList from "../pages/AddList";
import ItemList from "../pages/ItemList";
import NotFound from "../pages/NotFound";

function Routes() {
    return (
      <Switch>
        <Route exact path={PATH_HOME} component={Home}/>
        <Route path={PATH_ADD_LIST} component={AddList}/>
        <Route path={PATH_ITEM_LIST} component={ItemList}/>
        <Route component={NotFound}/>
      </Switch>
    )
}

export default Routes;