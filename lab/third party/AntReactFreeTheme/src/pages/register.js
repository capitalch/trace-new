import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import logo from '../static/images/logo.png';
import LayoutLogin from '../components/LayoutLogin';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

class Index extends React.Component {
  handleSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields ((err, values) => {
      if (!err) {
        console.log ('Received values of form: ', values);
      }
    });
  };

  render () {
    const {getFieldDecorator} = this.props.form;

    return (
      <LayoutLogin title="assets" classname="login">
        <div
          className="d-flex alignr-items-center justify-content-center flex-column"
          style={{maxWidth: '360px', margin: 'auto', height: '100vh'}}
        >
          <div className="text-center">
            <img src={logo} />
            <h1 className="m-b-30 m-t-15">Ant design</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              {getFieldDecorator ('Name', {
                rules: [{required: true, message: 'Please input your Name!'}],
              }) (
                <Input
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Name"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator ('Email', {
                rules: [{required: true, message: 'Please input your Email!'}],
              }) (
                <Input
                  prefix={
                    <Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator ('password', {
                rules: [
                  {required: true, message: 'Please input your Password!'},
                ],
              }) (
                <Input
                  prefix={
                    <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-block m-t-15"
                size="large"
              >
                <Link href="/">Register</Link>
              </Button>
              <span>
                Already have an account?
                <a className="m-l-5" href="/">
                  Log in
                </a>
              </span>

            </Form.Item>
          </Form>
        </div>
      </LayoutLogin>
    );
  }
}
const WrappedNormalLoginForm = Form.create ({name: 'normal_login'}) (Index);

export default WrappedNormalLoginForm;
