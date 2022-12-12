import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import logo from '../static/images/logo.png';
import LayoutLogin from '../components/LayoutLogin';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
class Login extends React.Component {
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
      <LayoutLogin title="login" classname="login">
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{maxWidth: '360px', margin: 'auto', height: '100vh'}}
        >
          <div className="text-center">
            <img src={logo} />
            <h1 className="m-b-30 m-t-15">Ant Dashboard</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator ('username', {
                rules: [
                  {required: true, message: 'Please input your username!'},
                ],
              }) (
                <Input
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Username"
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
              {getFieldDecorator ('remember', {
                valuePropName: 'checked',
                initialValue: true,
              }) (<Checkbox>Remember me</Checkbox>)}
              <Link className="float-right" to="">
                Forgot password
              </Link>

              <Button
                type="primary"
                htmlType="submit"
                className="btn-block m-t-15"
                size="large"
              >
                <Link to="/dashboard">Log in</Link>
              </Button>
              <p>Need an account? <Link to="/register"><a>Signup</a></Link></p>

            </Form.Item>
          </Form>
        </div>
      </LayoutLogin>
    );
  }
}

const WrappedNormalLoginForm = Form.create ({name: 'normal_login'}) (Login);

export default WrappedNormalLoginForm;
