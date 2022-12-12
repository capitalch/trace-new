import * as React from "react";
import { Pagination } from 'antd';
function showTotal(total) {
    return `Total ${total} items`;
  }

class Mini extends React.Component {
  render() {
      return (
        <div>
        <Pagination size="small" total={50} className='m-b-10'/>
        <Pagination size="small" total={50} showSizeChanger showQuickJumper className='m-b-10'/>
        <Pagination size="small" total={50} showTotal={showTotal} className='m-b-10'/>
      </div>
    );
  }
}


export default Mini;
