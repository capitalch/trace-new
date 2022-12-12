import * as React from "react";
import {Row,Col } from 'antd';
import * as styles from "../../styles/global.scss";
class FlexAlignment extends React.Component {
  render() {
      return (
        <div>   
       
            <Row className='gridView' type="flex" justify="center" align="top">
                <Col span={4}>
                    <p className={styles['height-100']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-50']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-120']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-80']}>col-4</p>
                </Col>
            </Row>
            <Row className='gridView m-t-15' type="flex" justify="space-around" align="middle">
                 <Col span={4}>
                    <p className={styles['height-100']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-50']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-120']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-80']}>col-4</p>
                </Col>
            </Row>
            <Row className='gridView m-t-15' type="flex" justify="space-between" align="bottom">
                <Col span={4}>
                    <p className={styles['height-100']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-50']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-120']}>col-4</p>
                </Col>
                <Col span={4}>
                <p className={styles['height-80']}>col-4</p>
                </Col>
            </Row>
       </div>
    );
  }
}
export default FlexAlignment;
