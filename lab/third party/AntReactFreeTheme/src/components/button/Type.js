import * as React from "react";
import { Button } from 'antd';
class Type extends React.Component {
  
  render() {

      return (
        <div>
            <Button type="primary" className='m-r-10'>Primary</Button>
            <Button className='m-r-10'>Default</Button>
            <Button type="dashed" className='m-r-10'>Dashed</Button>
            <Button type="danger" className='m-r-10'>Danger</Button>
            <Button type="link" className='m-r-10'>Link</Button>
      </div>

    );
  }
}
export default Type;
