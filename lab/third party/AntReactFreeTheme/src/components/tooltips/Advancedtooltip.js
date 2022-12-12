import * as React from 'react';
import {Tooltip, Button} from 'antd';

const text = <span>prompt text</span>;
const buttonWidth = 70;

class AdvancedTip extends React.Component {
  render () {
    return (
      <div className="sm-view">
        <div className="scroll-item">
          <div style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
            <Tooltip placement="topLeft" title={text}>
              <Button style={{marginRight: '10px'}}>TL</Button>
            </Tooltip>
            <Tooltip placement="top" title={text}>
              <Button style={{marginRight: '10px'}}>Top</Button>
            </Tooltip>
            <Tooltip placement="topRight" title={text}>
              <Button>TR</Button>
            </Tooltip>
          </div>
          <div style={{width: buttonWidth, float: 'left', marginLeft: '40px'}}>
            <Tooltip placement="leftTop" title={text}>
              <Button style={{marginBottom: '10px'}}>LT</Button>
            </Tooltip>
            <Tooltip placement="left" title={text}>
              <Button style={{marginBottom: '10px'}}>Left</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" title={text}>
              <Button>LB</Button>
            </Tooltip>
          </div>
          <div
            style={{
              width: buttonWidth,
              marginLeft: 'auto',
              marginRight: '40px',
            }}
          >
            <Tooltip placement="rightTop" title={text}>
              <Button style={{marginBottom: '10px'}}>RT</Button>
            </Tooltip>
            <Tooltip placement="right" title={text}>
              <Button style={{marginBottom: '10px'}}>Right</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" title={text}>
              <Button>RB</Button>
            </Tooltip>
          </div>
          <div style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
            <Tooltip placement="bottomLeft" title={text}>
              <Button style={{marginRight: '10px'}}>BL</Button>
            </Tooltip>
            <Tooltip placement="bottom" title={text}>
              <Button style={{marginRight: '10px'}}>Bottom</Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title={text}>
              <Button>BR</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
export default AdvancedTip;
