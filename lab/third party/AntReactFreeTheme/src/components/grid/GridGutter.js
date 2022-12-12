import * as React from "react";
import {Row,Col } from 'antd';

class GridGutter extends React.Component {
  render() {
      return (
        <div>   
            <Row gutter={16} >
                <Col span={12}> 
                  <div className='custom-col'>col-12</div>
                </Col>
                <Col span={12}> 
                  <div className='custom-col'>col-12</div>
                </Col>
            </Row>
            <Row gutter={16} className='m-t-15'>
                <Col span={8}>
                  <div className='custom-col'>col-8</div>
                </Col>
                <Col span={8}>
                  <div className='custom-col'>col-8</div>
                </Col>
                <Col span={8}>
                  <div className='custom-col'>col-8</div>
                </Col>
            </Row>
            <Row gutter={16} className='m-t-15'>
                <Col span={6}>
                  <div className='custom-col'>col-6</div>
                </Col>
                <Col span={6}>
                  <div className='custom-col'>col-6</div>
                </Col>
                <Col span={6}>
                  <div className='custom-col'>col-6</div>
                </Col>
                <Col span={6}>
                  <div className='custom-col'>col-6</div>
                </Col>
            </Row>
       </div>
    );
  }
}
export default GridGutter;
