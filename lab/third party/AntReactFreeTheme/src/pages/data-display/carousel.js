import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card, Button, Form} from 'antd';
import BasicCareousel from '../../components/carousel/Basic';
import NavPosition from '../../components/carousel/NavPosition';
import AutoscrollCareousel from '../../components/carousel/AutoScroll';
import FadeinCareousel from '../../components/carousel/Fadein';

class Carousel extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              title={<p>Basic Carousel</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <div>
                <BasicCareousel />
              </div>
            </Card>
            <Card
              bordered={false}
              title={<p>Advanced Carousel</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15 m-b-15"
            >
              <div>
                <NavPosition />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              title={<p>Autoscroll Carousel</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <div>
                <AutoscrollCareousel />
              </div>
            </Card>
            <Card
              bordered={false}
              title={<p>Fade in Carousel</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <div>
                <FadeinCareousel />
              </div>
            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default Carousel;
