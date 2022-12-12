import * as React from "react";
import {Row,Col} from 'antd';
class FlexLayout extends React.Component {
  render() {
      return (
        <div>   
            <Row className='gridView' type="flex" justify="start">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>
            <Row className='gridView m-t-15' type="flex" justify="center">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>
            <Row className='gridView m-t-15' type="flex" justify="end">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>
       </div>
    );
  }
}
export default FlexLayout;
