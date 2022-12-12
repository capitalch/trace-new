import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card} from 'antd';
import Basic from '../../components/typography/Basic';
import Text from '../../components/typography/Text';
import Interactive from '../../components/typography/Interactive';
import Title from '../../components/typography/Title';

class Typography extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>

          <Col xs={24} md={14}>
            <Card
              bordered={false}
              title={<p>Basic Typography</p>}
              bodyStyle={{padding: '0 20px 10px'}}
            >
              <Basic />
            </Card>
            <Card
              bordered={false}
              title={<p> Title</p>}
              bodyStyle={{padding: '0 20px 10px'}}
              className="m-t-15 m-b-15"
            >
              <Title />
            </Card>

          </Col>
          <Col xs={24} md={10}>

            <Card
              bordered={false}
              title={<p> Text Typography </p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Text />

            </Card>

            <Card
              bordered={false}
              title={<p>Button Typography</p>}
              bodyStyle={{padding: '0 20px 10px'}}
              className="m-t-15"
            >
              <Interactive />
            </Card>

          </Col>

        </Row>

      </Layouts>
    );
  }
}

export default Typography;
