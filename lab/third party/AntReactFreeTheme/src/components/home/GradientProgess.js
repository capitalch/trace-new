import * as React from 'react';
import {Progress} from 'antd';

class GradientProgess extends React.Component {
  render () {
    return (
      <div>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
      </div>
    );
  }
}
export default GradientProgess;
