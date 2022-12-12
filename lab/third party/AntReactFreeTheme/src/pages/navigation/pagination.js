import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card} from 'antd';
import Basicpagination from '../../components/navigation/pagination/Basic';
import More from '../../components/navigation/pagination/More';
import Jumper from '../../components/navigation/pagination/Jumper';
import Changer from '../../components/navigation/pagination/Changer';
import Mini from '../../components/navigation/pagination/Mini';
import PreNext from '../../components/navigation/pagination/PreNext';

class Pagination extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              title={<p>Changer Pagination</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="custom-pagination"
            >
              <Changer />
            </Card>
            <Card
              bordered={false}
              title={<p>Mini Size Pagination</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Mini />
            </Card>
            <Card
              bordered={false}
              title={<p>Prev and Next Pagination</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <PreNext />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              title={<p>Basic  Pagination</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <Basicpagination />
            </Card>
            <Card
              bordered={false}
              title={<p>More Pagination</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15 custom-pagination"
            >
              <More />
            </Card>
            <Card
              bordered={false}
              title={<p>Jumper Pagination</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15 custom-pagination"
            >
              <Jumper />
            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default Pagination;
