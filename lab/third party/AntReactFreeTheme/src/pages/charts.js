import * as React from 'react';
import Layouts from '../components/Layouts';
import {Row, Col, Card, Button, Form} from 'antd';
import BasicLineChart from '../components/charts/BasicLineChart';
import TinyBar from '../components/charts/TinyBar';
import TwoLevelPieChart from '../components/charts/TwoLevelPieChart';
import TreeMap from '../components/charts/TreeMap';
import Piechart from '../components/charts/Piechart';

class Index extends React.Component {
  render () {
    return (
      <Layouts title="charts" classname="grid">
        <Row gutter={16}>
          <Col xs={24} md={16}>

            <Card
              bordered={false}
              title={<p>Simple Line Chart </p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <BasicLineChart />
            </Card>
            <Card
              bordered={false}
              title={<p>Custom  Treemap</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15 m-b-15"
            >
              <TreeMap />
            </Card>

          </Col>

          <Col xs={24} md={8}>
            <Card
              bordered={false}
              title={<p>Tiny Bar Chart</p>}
              bodyStyle={{padding: '0 20px 16px'}}
            >
              <TinyBar />
            </Card>
            <Card
              bordered={false}
              title={<p>Two Level Pie Chart</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <TwoLevelPieChart />
            </Card>
            <Card
              bordered={false}
              title={<p> Pie Chart with Customized Label</p>}
              bodyStyle={{padding: '0 20px 0'}}
              className="m-t-15"
            >
              <Piechart />
            </Card>

          </Col>

        </Row>

      </Layouts>
    );
  }
}

export default Index;
