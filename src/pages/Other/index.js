import React, { PureComponent } from "react";
import { Divider, Pagination, Button } from "antd";

class Other extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      test: "我是Other的按钮",
    };
  }

  // componentDidMount() {
  //   console.log(this.props, 'props');
  // }

  render() {
    const { test } = this.state;
    console.log(this.props, "other props");
    return (
      <div style={{ textAlign: "center" }}>
        <Button type="primary">{test}</Button>
        <Divider />
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
      </div>
    );
  }
}

export default Other;
