import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// 组件:Pages
import Home from './pages/Home';
// 样式
import './static/css/index.less';

class RouterConfig extends PureComponent {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default RouterConfig;
