import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card} from 'antd';
import Type from '../../components/button/Type';
import Icons from '../../components/button/Icons';
import Loading from '../../components/button/Loading';
import Disabled from '../../components/button/Disabled';
import Size from '../../components/button/Size';
import Block from '../../components/button/Block';
import Ghost from '../../components/button/Ghost';
import Group from '../../components/button/Group';
import Multiple from '../../components/button/Multiple';

class Buttons extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>

          <Col xs={24} md={14}>
            <Card
              bordered={false}
              title={<p>Button Type</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Type />
            </Card>
            <Card
              bordered={false}
              title={<p> Button Size</p>}
              bodyStyle={{padding: '0 20px 16px'}}
              className="m-t-15"
            >
              <Size />
            </Card>

            <Card
              bordered={false}
              title={<p>Button Group</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Group />
            </Card>
            <Card
              bordered={false}
              title={<p>Button Block</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Block />
            </Card>

          </Col>
          <Col xs={24} md={10}>

            <Card
              bordered={false}
              title={<p> Loading Button </p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Loading />

            </Card>

            <Card
              bordered={false}
              title={<p>Button with Icons</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Icons />
            </Card>
            <Card
              bordered={false}
              title={<p>Disabled Button</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Disabled />
            </Card>
            <Card
              bordered={false}
              title={<p>Multiple Buttons</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Multiple />
            </Card>
            <Card
              bordered={false}
              title={<p>Ghost Buttons</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Ghost />
            </Card>

          </Col>

        </Row>

      </Layouts>
    );
  }
}

export default Buttons;
