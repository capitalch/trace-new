import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card} from 'antd';
import AutoComplete from '../../components/form/form-components/AutoComplete';
import CheckBox from '../../components/form/form-components/CheckBox';
import Cascader from '../../components/form/form-components/Cascader';
import Rate from '../../components/form/form-components/Rate';

class FormComponents extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <Card
              bordered={false}
              title={<p>Auto  Complete</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <AutoComplete />
            </Card>
            <Card
              bordered={false}
              title={<p>Custom CheckBox</p>}
              bodyStyle={{padding: '0 20px 10px'}}
              className="m-t-15"
            >
              <CheckBox />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              bordered={false}
              title={<p>Basic Cascader</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Cascader />
            </Card>
            <Card
              bordered={false}
              title={<p>Rate</p>}
              bodyStyle={{padding: '0 20px 16px'}}
              className="m-t-15"
            >
              <Rate />
            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default FormComponents;
