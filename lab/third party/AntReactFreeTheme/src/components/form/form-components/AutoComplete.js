import * as React from 'react';
import {AutoComplete, Row, Col, Input} from 'antd';

const {Option} = AutoComplete;
const {TextArea} = Input;
const dataSource3 = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

function onSelect (value) {
  console.log ('onSelect', value);
}

class AutoCompletecomponent extends React.Component {
  state = {
    dataSource: [],
    result: [],
    dataSource2: [],
  };

  handleSearch = value => {
    this.setState ({
      dataSource: !value ? [] : [value, value + value, value + value + value],
    });
  };
  handleSearch = value => {
    let result;
    if (!value || value.indexOf ('@') >= 0) {
      result = [];
    } else {
      result = ['gmail.com', '163.com', 'qq.com'].map (
        domain => `${value}@${domain}`
      );
    }
    this.setState ({result});
  };
  handleSearch2 = value => {
    this.setState ({
      dataSource2: !value ? [] : [value, value + value, value + value + value],
    });
  };
  handleKeyPress2 = ev => {
    console.log ('handleKeyPress', ev);
  };

  render () {
    const {dataSource} = this.state;
    const {dataSource2} = this.state;
    const {result} = this.state;
    const children = result.map (email => <Option key={email}>{email}</Option>);

    return (
      <Row>
        <Col xs={24} md={12}>
          <label>Basic </label><br />
          <AutoComplete
            dataSource={dataSource}
            onSelect={onSelect}
            onSearch={this.handleSearch}
            placeholder="input here"
          />
          <br /><br />
          <label>Customized Input Component </label><br />
          <AutoComplete
            dataSource={dataSource2}
            style={{width: 200}}
            onSelect={onSelect}
            onSearch={this.handleSearch2}
          >
            <TextArea
              placeholder="input here"
              className="custom"
              style={{height: 50}}
              onKeyPress={this.handleKeyPress2}
            />
          </AutoComplete>
        </Col>
        <Col xs={24} md={12} className="custamized-input">
          <label>Customized </label><br />
          <AutoComplete onSearch={this.handleSearch} placeholder="input here">
            {children}
          </AutoComplete>
          <br /><br />
          <label>Non-case Sensitive AutoComplete </label><br />
          <AutoComplete
            style={{width: 200}}
            dataSource={dataSource3}
            placeholder="try to type `b`"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase ()
                .indexOf (inputValue.toUpperCase ()) !== -1}
          />
        </Col>
      </Row>
    );
  }
}

export default AutoCompletecomponent;
