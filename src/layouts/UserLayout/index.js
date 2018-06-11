import React, { PureComponent } from "react";
import { Divider, Pagination, Button } from "antd";

class UserLayout extends PureComponent {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Button type="primary">我是UserLayout的按钮</Button>
        <Divider />
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
      </div>
    );
  }
}

export default UserLayout;
