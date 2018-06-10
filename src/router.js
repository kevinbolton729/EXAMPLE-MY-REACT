import React, { Component } from 'react';
import { LocaleProvider, Divider, Pagination, Button } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// 样式
import './static/css/router.less';
// Logo
import logo from './static/images/logo.svg';

class RouterConfig extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className="router">
          <div className="router-logo">
            <img src={logo} width="160" height="160" alt="" />
          </div>
          <Button type="primary">Button</Button>
          <Divider />
          <Pagination defaultCurrent={1} total={50} showSizeChanger />
        </div>
      </LocaleProvider>
    );
  }
}

export default RouterConfig;
