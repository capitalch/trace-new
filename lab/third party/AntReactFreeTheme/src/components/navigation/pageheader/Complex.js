import * as React from "react";
import { PageHeader, Tag, Tabs, Button, Statistic, Row, Col } from 'antd';

const { TabPane } = Tabs;

const Description = ({ term, children }) => (
    <Col lg={12} md={24}>
      <div className="description">
        <span className="term">{term}</span>
        <span className="detail">{children}</span>
      </div>
    </Col>
  );
  
  const content = (
    <Row>
      <Description term="Created: ">Lili Qu</Description>
      <Description term="Association: ">
       <a> 421421</a>
      </Description>
      <Description term="Creation Time: ">2017-01-10</Description>
      <Description term="Effective Time: ">2017-10-10</Description>
      <Description term="Remarks: " span={24}>
        Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
      </Description>
    </Row>
  );
  
  const extraContent = (
    <Row>
      <Col lg={12} md={24}>
        <Statistic title="Status" value="Pending" />
      </Col>
      <Col span={12}>
        <Statistic title="Price" prefix="$" value={568.08} />
      </Col>
    </Row>
  );

class Complex extends React.Component {
  render() {
      return (
        <PageHeader
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        tags={<Tag color="red"  className="m-l-5 mb-sm-5 m-b-5">Warning</Tag>}
        extra={[
          <Button key="3" className="m-r-5 m-b-5">Operation</Button>,
          <Button key="2"  className="m-r-5 m-b-5">Operation</Button>,
          <Button key="1"  className="m-r-5 m-b-5" type="primary">
            Primary
          </Button>,
        ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Details" key="1" />
            <TabPane tab="Rule" key="2" />
          </Tabs>
        }
      >
        <div className="wrap">
          <div className="content padding">{content}</div>
          <div className="extraContent">{extraContent}</div>
        </div>
      </PageHeader>

    );
  }
}


export default Complex;
