import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card, Button} from 'antd';
import TopNav from '../../components/navigation/menu/TopNav';
import Inline from '../../components/navigation/menu/Inline';
import Collapsed from '../../components/navigation/menu/Collapsed';
import CurrentMenu from '../../components/navigation/menu/CurrentMenu';
import VerticalMenu from '../../components/navigation/menu/VerticalMenu';
import MenuTheme from '../../components/navigation/menu/MenuTheme';
import SwitchMenu from '../../components/navigation/menu/SwitchMenu';

class Menu extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="menu">
        <Row gutter={16}>
          <Col xs={24}>
            <Card
              bordered={false}
              title={<p>Top Navigation </p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <TopNav />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="m-t-15">
          <Col xs={24} lg={12}>

            <Card
              bordered={false}
              title={<p>Inline menu</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Inline />
            </Card>
            <Card
              bordered={false}
              title={<p>Current Submenu</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <CurrentMenu />
            </Card>
            <Card
              bordered={false}
              title={<p>Menu Themes</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <MenuTheme />
            </Card>

          </Col>

          <Col xs={24} lg={12} className="custom-margintop">
            <Card
              bordered={false}
              title={<p>Collapsed Inline Menu</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Collapsed />
            </Card>

            <Card
              bordered={false}
              title={<p>Vertical menu</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <VerticalMenu />
            </Card>
            <Card
              bordered={false}
              title={<p>Switch Menu Type</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <SwitchMenu />
            </Card>

          </Col>

        </Row>

      </Layouts>
    );
  }
}

export default Menu;
