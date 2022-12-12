import * as React from "react";
import { Button } from 'antd';


class Disabled extends React.Component {
  
  render() {

      return (
        <div>
            <Button type="primary" className='m-r-10 m-b-5' >Primary</Button>
            <Button type="primary" disabled className="m-b-5">
            Primary(disabled)
            </Button>
            <div className='m-t-10 '>
            <Button className='m-r-10 m-b-5'>Default</Button>
            <Button disabled className="m-b-5">Default(disabled)</Button>
            </div>
            <div className='m-t-10'>
            <Button type="dashed" className='m-r-10 m-b-5'>Dashed</Button>
            <Button type="dashed" disabled className="m-b-5">
            Dashed(disabled)
            </Button>
            </div>
            <div className='m-t-10'>
            <Button type="link" className="m-b-5">Link</Button>
            <Button type="link" disabled className="m-b-5">
            Link(disabled)
            </Button>
            </div>
            <div style={{ padding: '8px ', background: 'rgb(190, 200, 200)' }}>
            <Button ghost className="m-t-5 m-b-5 m-r-5">Ghost</Button>
            <Button ghost disabled className="m-t-5 m-b-5 m-r-5">
                Ghost(disabled)
            </Button>
            </div>
        </div>

    );
  }
}
export default Disabled;
