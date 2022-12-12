import * as React from "react";
import { Button } from 'antd';


class Icons extends React.Component {
  
  render() {

      return (
        <div>
        <Button type="primary" shape="circle" icon="search" className='m-r-10 m-b-5' />
        <Button type="primary" icon="search" className='m-r-10 m-b-5'>
          Search
        </Button>
        <Button shape="circle" icon="search" className='m-r-10 m-b-5'/>
        <Button icon="search">Search</Button>
        <div className='m-t-10'>
          <Button shape="circle" icon="search" className='m-r-10 m-b-5'/>
          <Button icon="search" className='m-r-10 m-b-5'>Search</Button>
          <Button type="dashed" shape="circle" icon="search" className='m-r-10 m-b-5'/>
          <Button type="dashed" icon="search">
            Search
          </Button>
        </div>
      </div>

    );
  }
}
export default Icons;
