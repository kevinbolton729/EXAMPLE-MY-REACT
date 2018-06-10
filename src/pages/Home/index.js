import React, { Component } from 'react';
import { Divider, Pagination, Button } from 'antd';
// 样式
import './index.less';
// Logo
import logo from '../../static/images/logo.svg';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-logo">
          <img src={logo} width="160" height="160" alt="" />
        </div>
        <Button type="primary">Button</Button>
        <Divider />
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
      </div>
    );
  }
}

export default Home;
