import * as React from "react";
import { PageHeader } from 'antd';


class Basic extends React.Component {
  render() {
      return (
          <PageHeader onBack={() => null} title="Title" subTitle="This is a subtitle" />

    );
  }
}


export default Basic;
