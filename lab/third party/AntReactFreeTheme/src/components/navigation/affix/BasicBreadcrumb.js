import * as React from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

class BasicBreadcrumb extends React.Component {
  render () {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">Application Center</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">Application List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}
export default BasicBreadcrumb;
