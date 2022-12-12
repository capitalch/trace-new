import * as React from 'react';
import {Menu, Dropdown, Icon} from 'antd';
import {Link} from 'react-router-dom';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="#">1st menu item</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="#">2nd menu item</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

class TriggerMode extends React.Component {
  render () {
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Link className="ant-dropdown-link" to="#">
          Click me <Icon type="down" />
        </Link>
      </Dropdown>
    );
  }
}
export default TriggerMode;
