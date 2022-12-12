import * as React from 'react';
import {Layout} from 'antd';
const {Header, Footer, Sider, Content} = Layout;

class BasicLayout extends React.Component {
  render () {
    return (
      <Layout className="layoutpage">
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
