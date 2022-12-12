import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card, Button} from 'antd';
import Basic from '../../components/navigation/pageheader/Basic';
import Breadcrumbs from '../../components/navigation/pageheader/Breadcrumbs';
import Content from '../../components/navigation/pageheader/Content';
import Complex from '../../components/navigation/pageheader/Complex';

class Pageheader extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="pageheader">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              title={<p>Basic  Page Header</p>}
              bodyStyle={{padding: '0 0 20px'}}
              className="m-t-15"
            >
              <Basic />
            </Card>
            <Card
              bordered={false}
              title={<p>Page Header with Breadcrumbs</p>}
              bodyStyle={{padding: '0 0 20px'}}
              className="m-t-15"
            >
              <Breadcrumbs />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              title={<p>Page Header with Content</p>}
              bodyStyle={{padding: '0 0 20px'}}
              className="m-t-15"
            >
              <Content />
            </Card>
          </Col>
          <Col xs={24} sm={24}>
            <Card
              bordered={false}
              title={<p>Complex Example</p>}
              bodyStyle={{padding: '0 0 20px'}}
              className="m-t-15"
            >
              <Complex />
            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default Pageheader;
