import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card} from 'antd';
import Basic from '../../components/steps/Basic';
import Mini from '../../components/steps/Mini';
import Icons from '../../components/steps/Icons';
import Vertical from '../../components/steps/Vertical';
import Switch from '../../components/steps/Switch';
import Error from '../../components/steps/Error';
import Dot from '../../components/steps/Dot';

class Steps extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="steps">

        <Row gutter={16}>
          <Col xs={24} sm={24}>

            <Card
              bordered={false}
              title={<p>Basic  Steps</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Basic />
            </Card>
            <Card
              bordered={false}
              title={<p>Mini version</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Mini />
            </Card>
            <Card
              bordered={false}
              title={<p>With Icons</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Icons />
            </Card>

            <Card
              bordered={false}
              title={<p>Vertical Steps</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Vertical />
            </Card>

          </Col>
          <Col xs={24} sm={24}>
            <Card
              bordered={false}
              title={<p>Switch Steps</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Switch />
            </Card>

            <Card
              bordered={false}
              title={<p>Error Status</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Error />
            </Card>
            <Card
              bordered={false}
              title={<p>Dots Style</p>}
              bodyStyle={{padding: '0 20px 20px', overflow: 'scroll'}}
              className="m-t-15"
            >
              <Dot />
            </Card>
          </Col>
        </Row>

      </Layouts>
    );
  }
}

export default Steps;
