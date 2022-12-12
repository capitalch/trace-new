import * as React from 'react';
import {Checkbox, Button, Row, Col} from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
function onChange (e) {
  console.log (`checked = ${e.target.checked}`);
}

class Checkboxcomponent extends React.Component {
  state = {
    checked: true,
    disabled: false,
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };
  toggleChecked = () => {
    this.setState ({checked: !this.state.checked});
  };

  toggleDisable = () => {
    this.setState ({disabled: !this.state.disabled});
  };

  onChange = e => {
    console.log ('checked = ', e.target.checked);
    this.setState ({
      checked: e.target.checked,
    });
  };
  onChange2 = checkedList => {
    this.setState ({
      checkedList,
      indeterminate: !!checkedList.length &&
        checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = e => {
    this.setState ({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render () {
    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;
    return (
      <Row>
        <Col sm={12} xl={8}>
          <h4 style={{margin: '0', padding: '0'}}>Basic Checkbox </h4>
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
          <br />
          <br />
          <h4 style={{margin: '0', padding: '0'}}>Controlled Checkbox </h4>
          <div>
            <p style={{marginBottom: '20px'}}>
              <Checkbox
                checked={this.state.checked}
                disabled={this.state.disabled}
                onChange={this.onChange}
              >
                {label}
              </Checkbox>
            </p>
            <p>
              <Button type="primary" size="small" onClick={this.toggleChecked}>
                {!this.state.checked ? 'Check' : 'Uncheck'}
              </Button>
              <Button
                style={{marginLeft: '10px'}}
                type="primary"
                size="small"
                onClick={this.toggleDisable}
              >
                {!this.state.disabled ? 'Disable' : 'Enable'}
              </Button>
            </p>
          </div>
        </Col>
        <Col sm={12} xl={8}>
          <h4 style={{margin: '0', padding: '0'}}>Disabled Checkbox </h4>
          <div>
            <Checkbox defaultChecked={false} disabled />
            <br />
            <Checkbox defaultChecked disabled />
          </div>

        </Col>
        <Col xs={24} xl={8} className="controlled-checkbox">
          <div>
            <h4 style={{margin: '0', padding: '0'}}>Check All </h4>
            <div
              style={{borderBottom: '1px solid #E9E9E9', paddingBottom: '10px'}}
            >
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <br />
            <CheckboxGroup
              options={plainOptions}
              value={this.state.checkedList}
              onChange={this.onChange2}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Checkboxcomponent;
