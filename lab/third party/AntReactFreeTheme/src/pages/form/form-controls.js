import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card, Button, Form} from 'antd';
import AdvancedSearch from '../../components/form/form-controls/AdvancedSearch';
import CustomizedValidation
  from '../../components/form/form-controls/CustomizedValidation';
import CustomizedFormControls
  from '../../components/form/form-controls/CustomizedFormControls';
import TimeRelatedControls
  from '../../components/form/form-controls/TimeRelatedControls';
import OtherFormControls
  from '../../components/form/form-controls/OtherFormControls';

const TimeRelatedControl = Form.create ({name: 'time_related_controls'}) (
  TimeRelatedControls
);

const OtherFormControl = Form.create ({name: 'validate_other'}) (
  OtherFormControls
);

const WrappedAdvancedSearchForm = Form.create ({name: 'advanced_search'}) (
  AdvancedSearch
);
const CustomizedForm = Form.create ({name: 'customized_form_controls'}) (
  CustomizedFormControls
);

class FormControls extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              title={<p>Advance  Search</p>}
              bodyStyle={{padding: '0 20px 20px'}}
            >
              <div>
                <WrappedAdvancedSearchForm />
                <div className="search-result-list">Search Result List</div>
              </div>
            </Card>
            <Card
              bordered={false}
              title={<p>Customized Validation</p>}
              bodyStyle={{padding: '0 20px 0'}}
              className="m-t-15"
            >
              <CustomizedValidation />
            </Card>
            <Card
              bordered={false}
              title={<p>Custmized Form Controls</p>}
              bodyStyle={{padding: '0 20px 20px 20px'}}
              className="m-t-15"
            >
              <CustomizedForm />
            </Card>

          </Col>
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              title={<p>Time Related Controls</p>}
              bodyStyle={{padding: '0 20px 0'}}
            >
              <TimeRelatedControl />
            </Card>

            <Card
              bordered={false}
              title={<p>Other Form Controls</p>}
              bodyStyle={{padding: '0 20px 0'}}
              className="m-t-15"
            >
              <OtherFormControl />
            </Card>

          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default FormControls;
