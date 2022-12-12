import * as React from 'react';
import {List, Avatar} from 'antd';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

const data = [
  {title: 'Ant Design Title 1'},
  {title: 'Ant Design Title 2'},
  {title: 'Ant Design Title 3'},
];

class ListWithoutBorder extends React.Component {
  render () {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Link to="https://ant.design">{item.title}</Link>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
export default ListWithoutBorder;
