import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card, Button, Form} from 'antd';
import SimpleList from '../../components/list/SimpleList';
import ListWithoutBorder from '../../components/list/ListWithoutBorder';
import Loadmore from '../../components/list/Loadmore';

class List extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>
          <Col xs={24} md={10}>
            <Card
              bordered={false}
              title={<p>Simple List</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <div>
                <SimpleList />
              </div>
            </Card>
            <Card
              bordered={false}
              title={<p>Basic List</p>}
              bodyStyle={{padding: '10px 20px'}}
              className="m-t-15"
            >
              <ListWithoutBorder />

            </Card>
          </Col>
          <Col xs={24} md={14}>

            <Card
              bordered={false}
              title={<p>List with Load more</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <Loadmore />

            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default List;
