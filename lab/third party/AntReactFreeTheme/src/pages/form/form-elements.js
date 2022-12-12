import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card, Button} from 'antd';
import LognForm from '../../components/form/form-elements/LognForm';
import HorizontalLoginForm
  from '../../components/form/form-elements/HorizontalLoginForm';
import RegistrationForm
  from '../../components/form/form-elements/RegistrationForm';
import DynamicForm from '../../components/form/form-elements/DynamicForm';
import CustomizedForm from '../../components/form/form-elements/CustomizedForm';

class FormElements extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>
          <Col xs={24} lg={10}>
            <Card
              bordered={false}
              title={<p>Login Form</p>}
              bodyStyle={{padding: '0 20px 0'}}
            >
              <LognForm />
            </Card>
            <Card
              bordered={false}
              title={<p>Custmized Form Controls</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <CustomizedForm />
            </Card>
            <Card
              bordered={false}
              title={<p>Dynamic Form Item</p>}
              bodyStyle={{padding: '0 20px 0'}}
              className="m-t-15"
            >
              <DynamicForm />
            </Card>
          </Col>
          <Col xs={24} lg={14}>
            <Card
              bordered={false}
              title={<p>Horizontal Login  Form</p>}
              bodyStyle={{padding: '0 20px 15px'}}
            >
              <HorizontalLoginForm />
            </Card>
            <Card
              bordered={false}
              title={<p>Registration Form</p>}
              bodyStyle={{padding: '0 20px 0'}}
              className="m-t-15"
            >
              <RegistrationForm />
            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default FormElements;
