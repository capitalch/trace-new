import * as React from "react";
import { Button, Radio, Icon } from 'antd';


class Size extends React.Component {
    state = {
        size: 'large',
      };
    
      handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
  
  render() {
    const size = this.state.size;

      return (
        <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <div className='m-b-10'>
          <Button type="primary" size={size}  className='m-r-10 m-t-5 m-b-5'>
            Primary
          </Button>
          <Button size={size} className='m-r-10 m-t-5 m-b-5'>Normal</Button>
          <Button type="dashed" size={size} className='m-r-10 m-t-5 m-b-5'>
            Dashed
          </Button>
          <Button type="danger" size={size} className='m-r-10 m-t-5 m-b-5'>
            Danger
          </Button>
          <Button type="link" size={size} className="m-t-5 m-b-5">
            Link
          </Button>`
        </div>
        <div className='m-b-10'>
        <Button type="primary" shape="circle" icon="download" size={size} className='m-r-10 m-t-5 m-b-5' />
        <Button type="primary" shape="round" icon="download" size={size} className='m-r-10 m-t-5 m-b-5'>
          Download
        </Button>
        <Button type="primary" icon="download" size={size}>
          Download
        </Button>
        </div>
        <div className='m-b-10'>
        <Button.Group size={size}>
          <Button type="primary" className='m-r-10 m-b-5'>
            <Icon type="left" />
            Backward
          </Button>
          <Button type="primary" className="m-b-5">
            Forward
            <Icon type="right" />
          </Button>
        </Button.Group>
        </div>
      </div>

    );
  }
}
export default Size;
