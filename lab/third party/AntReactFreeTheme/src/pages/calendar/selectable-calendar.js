import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Alert, Card, Calendar} from 'antd';
import moment from 'moment';

class SelectedCalender extends React.Component {
  state = {
    value: moment ('2017-01-25'),
    selectedValue: moment ('2017-01-25'),
  };

  onSelect = value => {
    this.setState ({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = value => {
    this.setState ({value});
  };

  render () {
    const {value, selectedValue} = this.state;

    return (
      <Layouts title="assets" classname="calendar">
        <Card
          bordered={false}
          bodyStyle={{padding: '20px'}}
          style={{overflow: 'scroll'}}
        >
          <div>
            <Alert
              message={`You selected date: ${selectedValue && selectedValue.format ('YYYY-MM-DD')}`}
            />
            <Calendar
              value={value}
              onSelect={this.onSelect}
              onPanelChange={this.onPanelChange}
            />
          </div>
        </Card>

      </Layouts>
    );
  }
}

export default SelectedCalender;
