import * as React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

import {Menu, Dropdown, Button} from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        to="http://www.alipay.com/"
      >
        1st menu item
      </Link>

    </Menu.Item>
    <Menu.Item>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        to="http://www.taobao.com/"
      >
        2nd menu item
      </Link>

    </Menu.Item>
    <Menu.Item>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        to="http://www.tmall.com/"
      >
        3rd menu item
      </Link>

    </Menu.Item>
  </Menu>
);

class Placement extends React.Component {
  render () {
    return (
      <div>
        <Dropdown
          overlay={menu}
          placement="bottomLeft"
          className="m-r-10 m-b-10"
        >
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown
          overlay={menu}
          placement="bottomCenter"
          className="m-r-10 m-b-10"
        >
          <Button>bottomCenter</Button>
        </Dropdown>
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          className="m-r-10 m-b-10"
        >
          <Button>bottomRight</Button>
        </Dropdown>
        <br />
        <Dropdown overlay={menu} placement="topLeft" className="m-r-10 m-b-10">
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown
          overlay={menu}
          placement="topCenter"
          className="m-r-10 m-b-10"
        >
          <Button>topCenter</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="topRight" className="m-r-10 m-b-10">
          <Button>topRight</Button>
        </Dropdown>
      </div>
    );
  }
}
export default Placement;
