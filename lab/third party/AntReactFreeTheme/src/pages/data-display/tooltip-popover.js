import * as React from 'react';
import Layouts from '../../components/Layouts';
import {Row, Col, Card} from 'antd';
import BasicTip from '../../components/tooltips/Basictooltip';
import AdvancedTip from '../../components/tooltips/Advancedtooltip';
import BasicPopover from '../../components/popovers/Basicpopover';
import AdvancedPopover from '../../components/popovers/Advancedpopover';

class Tooltip extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="grid">
        <Row gutter={16}>

          <Col sm={24} lg={24} xl={12}>
            <Card
              bordered={false}
              title={<p>Basic Popovers</p>}
              bodyStyle={{padding: '0 16px'}}
            >
              <div>
                <BasicPopover />
              </div>
            </Card>
            <Card
              bordered={false}
              title={<p>Advanced Popovers</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <div>
                <AdvancedPopover />
              </div>
            </Card>
          </Col>
          <Col sm={24} lg={24} xl={12}>
            <Card
              bordered={false}
              title={<p>Basic Tooltips</p>}
              bodyStyle={{padding: '0 16px'}}
            >
              <div>
                <BasicTip />
              </div>
            </Card>
            <Card
              bordered={false}
              title={<p>Advanced Tooltips</p>}
              bodyStyle={{padding: '0 20px 20px'}}
              className="m-t-15"
            >
              <div>
                <AdvancedTip />
              </div>
            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default Tooltip;
