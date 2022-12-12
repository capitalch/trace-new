import * as React from 'react';

import {Checkbox, List} from 'antd';
class TodoItem extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      done: false,
    };
    this.toggle = this.toggle.bind (this);
  }
  toggle () {
    const toggleValue = !this.state.done;
    this.setState ({
      done: toggleValue,
    });
  }

  render () {
    return (
      <List.Item className={!this.state.done ? '' : 'checkedList'}>
        <Checkbox
          onClick={e => {
            this.toggle ();
          }}
        />
        <p style={{marginBottom: '0px', marginLeft: '15px'}}>
          <span className={!this.state.done ? '' : 'strikethrough'}>
            {this.props.text}
          </span>
        </p>
      </List.Item>
    );
  }
}
export default TodoItem;
