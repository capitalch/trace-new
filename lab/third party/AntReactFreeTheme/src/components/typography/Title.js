import * as React from "react";
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;


class TitleCom extends React.Component {
  
  render() {

      return (
        <div>
        <Title>h1. Ant Design</Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
      </div>

    );
  }
}
export default TitleCom;
