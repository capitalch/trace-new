import * as React from "react";
import { Form, Row, Col, Input, Button, Icon } from 'antd';

class AdvancedSearch extends React.Component {
  state = {
    expand: false,
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col xs={24} md={12} xl={12} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
        md: { span: 6},
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 12 },
        md: { span: 18 },
      },
    };
    return (
      <Form {...formItemLayout} className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={5}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right'}}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} /></a>
            
          </Col>
        </Row>
      </Form>
    );
  }
}
export default AdvancedSearch;
