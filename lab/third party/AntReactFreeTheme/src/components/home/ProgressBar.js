import * as React from 'react';
import {Progress} from 'antd';
class ProgressBar extends React.Component {
  render () {
    return (
      <Progress
        type="circle"
        percent={this.props.number}
        format={percent => `${percent}%   `}
        strokeColor={this.props.color}
        strokeWidth={this.props.width}
      />
    );
  }
}
export default ProgressBar;
