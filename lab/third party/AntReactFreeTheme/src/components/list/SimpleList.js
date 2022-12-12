import * as React from 'react';
import {List} from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
];

class SimpleList extends React.Component {
  render () {
    return (
      <div>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}
export default SimpleList;
