import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { getRouterData } from "./routes";
// 组件:Pages
// import Home from "../pages/Home";
// 样式
import "../static/css/index.less";

class RouterConfig extends PureComponent {
  render() {
    const routerData = getRouterData();
    const components = {
      Home: routerData["/home"].component,
      Other: routerData["/other"].component,
    };

    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route exact path="/home" render={props => <components.Home {...props} />} />
            <Route exact path="/other" render={props => <components.Other {...props} />} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default RouterConfig;
