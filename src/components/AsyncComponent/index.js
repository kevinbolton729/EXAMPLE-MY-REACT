import React, { PureComponent } from "react";

const unmount = { status: false };

export default (loadComponent, placeholder = null) => {
  class AsyncComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.state = { component: null };
    }

    async componentWillMount() {
      const { default: component } = await loadComponent();

      if (unmount.status) {
        return;
      }
      this.setState({ component });
    }
    componentWillUnmount() {
      unmount.status = true;
    }

    render() {
      const { component: Component } = this.state;
      return Component ? <Component {...this.props} /> : placeholder;
    }
  }

  return AsyncComponent;
};
