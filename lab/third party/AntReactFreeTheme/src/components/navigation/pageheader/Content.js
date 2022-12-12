import * as React from "react";
import { PageHeader, Typography } from 'antd';
const { Paragraph } = Typography;

const routes = [
    {
      path: 'index',
      breadcrumbName: 'First-level Menu',
    },
    {
      path: 'first',
      breadcrumbName: 'Second-level Menu',
    },
    {
      path: 'second',
      breadcrumbName: 'Third-level Menu',
    },
  ];


  const content = (
    <div>
      <Paragraph>
        Ant Design interprets the color system into two levels: a system-level color system and a
        product-level color system.
      </Paragraph>
      <Paragraph>
        Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
        easier for designers to have a clear psychological expectation of color when adjusting colors,
        as well as facilitate communication in teams.
      </Paragraph>
      <p >
        
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            alt="start" className=""
          />
         <span className="m-r-5 m-l-5"> Quick Start</span>
        
        
          <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info" />
          <span className="m-r-5 m-l-5"> Product Info</span>
        
        
          <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc" />
         <span className="m-r-5 m-l-5">  Product Doc</span>
        
      </p>
    </div>
  );
  
  const extraContent = (
    <img
      src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
      alt="content"
    />
  );

class Content extends React.Component {
  render() {
      return (
        <PageHeader title="Title" breadcrumb={{ routes }}>
        <div >
          <div >{content}</div>
          <div >{extraContent}</div>
        </div>
      </PageHeader>
    );
  }
}


export default Content;
