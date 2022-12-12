import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card} from 'antd';
import Basic from '../../components/navigation/affix/Basic';
import Scroll from '../../components/navigation/affix/Scroll';
import CallBack from '../../components/navigation/affix/CallBack';
import BasicBreadcrumb from '../../components/navigation/affix/BasicBreadcrumb';
import BreadcrumbWithIcon
  from '../../components/navigation/affix/BreadcrumbWithIcon';

class Affix extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="affix">
        <Row gutter={16}>
          <Col xs={24} md={8}>

            <Card
              bordered={false}
              title={<p>Basic Affix</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Basic />
            </Card>
            <Card
              bordered={false}
              title={<p>Callback</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <CallBack />
            </Card>

            <Card
              bordered={false}
              title={<p>Breadcrumb with Icons</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <BreadcrumbWithIcon />
            </Card>

          </Col>

          <Col xs={24} md={16}>
            <Card
              bordered={false}
              title={<p>Container to Scroll</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Scroll />
            </Card>
            <Card
              bordered={false}
              title={<p>Basic Breadcrumb</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <BasicBreadcrumb />
            </Card>

          </Col>
        </Row>

      </Layouts>
    );
  }
}

export default Affix;
