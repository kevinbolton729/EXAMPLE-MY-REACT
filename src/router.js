import React, { Component } from 'react';
// import { Router, Route, browserHistory } from 'react-router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// 组件:Pages
import Home from './pages/Home';
// 样式
import './static/css/index.less';

class RouterConfig extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Home />
      </LocaleProvider>
    );
  }
}

export default RouterConfig;
