import * as React from 'react';
import {Timeline} from 'antd';

class TimeLine extends React.Component {
  render () {
    return (
      <Timeline>
        <Timeline.Item>Responded to need 2019-01-01</Timeline.Item>
        <Timeline.Item>Added an interest 2019–02-10</Timeline.Item>
        <Timeline.Item>Joined the group 2019-03-27</Timeline.Item>
        <Timeline.Item>Responded to need 2019-05-09</Timeline.Item>
        <Timeline.Item>Responded to need 2019-01-01</Timeline.Item>
        <Timeline.Item>Added an interest 2019–02-10</Timeline.Item>
      </Timeline>
    );
  }
}
export default TimeLine;
