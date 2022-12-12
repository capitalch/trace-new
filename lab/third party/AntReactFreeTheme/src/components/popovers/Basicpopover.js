import * as React from 'react';
import {Popover, Button} from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

class BasicPopover extends React.Component {
  state = {
    visible: false,
  };

  hide = () => {
    this.setState ({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState ({visible});
  };
  render () {
    return (
      <div>
        <Popover content={content} title="Title">
          <Button type="primary" style={{marginBottom: '20px'}}>
            Hover me
          </Button>
        </Popover>
        <Popover
          content={<a onClick={this.hide}>Close</a>}
          title="Title"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="primary" style={{marginLeft: '10px'}}>Click me</Button>
        </Popover>
      </div>
    );
  }
}
export default BasicPopover;
