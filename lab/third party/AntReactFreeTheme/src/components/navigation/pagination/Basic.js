import * as React from "react";
import { Pagination } from 'antd';


class Basicpagination extends React.Component {
  render() {
      return (
        <Pagination defaultCurrent={1} total={50} />
    );
  }
}


export default Basicpagination;
