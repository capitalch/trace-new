import * as React from "react";
import { Button } from 'antd';


class Ghost extends React.Component {
  
  render() {

      return (
        <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
            <Button type="primary" ghost className='m-r-10 m-t-5 m-b-5'>
            Primary
            </Button>
            <Button ghost className='m-r-10'>Default</Button>
            <Button type="dashed" ghost className='m-r-10 m-t-5 m-b-5'>
            Dashed
            </Button>
            <Button type="danger" ghost className='m-r-10 m-t-5 m-b-5'>
            danger
            </Button>
            <Button type="link" ghost>
            link
            </Button>
        </div>

    );
  }
}
export default Ghost;
