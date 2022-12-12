import * as React from "react";
import {Row,Col } from 'antd';

class BasicGrid extends React.Component {

  render() {
      return (
        <div>   
       
            <Row className='gridView'>
                <Col span={12}>col-12</Col>
                <Col span={12}>col-12</Col>
            </Row>
            <Row className='gridView m-t-15'>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
            <Row className='gridView m-t-15'>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
            </Row>
         

       </div>
    );
  }
}


export default BasicGrid;
