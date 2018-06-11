import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { getRouterData } from "./routes";
// 样式
import "../static/css/index.less";

const routerData = getRouterData();
const components = {
  DefaultLayout: routerData["/"].component,
  UserLayout: routerData["/user"].component,
};

class RouterConfig extends PureComponent {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route exact path="/" render={props => <components.DefaultLayout {...props} />} />
            <Route exact path="/user" render={props => <components.UserLayout {...props} />} />
            {/* <Redirect from="/" to="/home" /> */}
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default RouterConfig;
