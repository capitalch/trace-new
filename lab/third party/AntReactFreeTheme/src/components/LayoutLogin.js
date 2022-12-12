import React from 'react';
import { Layout, Menu, Icon } from 'antd';


class LayoutLogin extends React.Component {
  render() {
    // const classname = (this.props, "classname", " ");
    return (
        <Layout  >
                <div className={`${ this.props.classname }`}>{this.props.children}</div> 
        </Layout>

   
  );
  }
}
export default LayoutLogin;