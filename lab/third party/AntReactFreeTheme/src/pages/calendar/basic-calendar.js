import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card, Calendar} from 'antd';

function onPanelChange (value, mode) {
  console.log (value, mode);
}

class BasicCalender extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="calendar">
        <Card
          bordered={false}
          bodyStyle={{padding: '20px'}}
          style={{overflow: 'scroll'}}
        >
          <Calendar onPanelChange={onPanelChange} />
        </Card>

      </Layouts>
    );
  }
}
export default BasicCalender;
