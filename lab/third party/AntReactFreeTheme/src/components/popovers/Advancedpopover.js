import * as React from 'react';
import {Popover, Button} from 'antd';

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 70;

class AdvancedPopover extends React.Component {
  render () {
    return (
      <div className="demo  sm-view">
        <div className="scroll-item">
          <div style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
            <Popover
              placement="topLeft"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginRight: '10px'}}>TL</Button>
            </Popover>
            <Popover
              placement="top"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginRight: '10px'}}>Top</Button>
            </Popover>
            <Popover
              placement="topRight"
              title={text}
              content={content}
              trigger="click"
            >
              <Button>TR</Button>
            </Popover>
          </div>
          <div style={{width: buttonWidth, float: 'left', marginLeft: '40px'}}>
            <Popover
              placement="leftTop"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginBottom: '10px'}}>LT</Button>
            </Popover>
            <Popover
              placement="left"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginBottom: '10px'}}>Left</Button>
            </Popover>
            <Popover
              placement="leftBottom"
              title={text}
              content={content}
              trigger="click"
            >
              <Button>LB</Button>
            </Popover>
          </div>
          <div
            style={{width: buttonWidth, float: 'right', marginRight: '40px'}}
          >
            <Popover
              placement="rightTop"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginBottom: '10px'}}>RT</Button>
            </Popover>
            <Popover
              placement="right"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginBottom: '10px'}}>Right</Button>
            </Popover>
            <Popover
              placement="rightBottom"
              title={text}
              content={content}
              trigger="click"
            >
              <Button>RB</Button>
            </Popover>
          </div>
          <div
            style={{textAlign: 'center', clear: 'both', whiteSpace: 'nowrap'}}
          >
            <Popover
              placement="bottomLeft"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginRight: '10px'}}>BL</Button>
            </Popover>
            <Popover
              placement="bottom"
              title={text}
              content={content}
              trigger="click"
            >
              <Button style={{marginRight: '10px'}}>Bottom</Button>
            </Popover>
            <Popover
              placement="bottomRight"
              title={text}
              content={content}
              trigger="click"
            >
              <Button>BR</Button>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}
export default AdvancedPopover;
