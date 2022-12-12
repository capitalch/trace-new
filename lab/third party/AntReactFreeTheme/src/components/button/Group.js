import * as React from "react";
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;


class Group extends React.Component {
  
  render() {

      return (
        <div>
        <h4>Basic</h4>
        <ButtonGroup className='m-r-10 m-t-5 m-b-5'>
        <Button>Cancel</Button>
        <Button>OK</Button>
        </ButtonGroup>
        <ButtonGroup className='m-r-10'>
        <Button disabled>L</Button>
        <Button disabled>M</Button>
        <Button disabled>R</Button>
        </ButtonGroup>
        <ButtonGroup>
        <Button>L</Button>
        <Button>M</Button>
        <Button>R</Button>
        </ButtonGroup>
        <div className='m-t-10 m-t-5 m-b-5'>

        <h4>With Icon</h4>
        <ButtonGroup className='m-r-10 m-t-5 m-b-5'>
        <Button type="primary" className="m-b-5">
            <Icon type="left" />
            Go back
        </Button>
        <Button type="primary" className="m-b-5">
            Go forward
            <Icon type="right" />
        </Button>
        </ButtonGroup>
        <ButtonGroup>
        <Button type="primary" icon="cloud" className="m-b-5"/>
        <Button type="primary" icon="cloud-download" className="m-b-5"/>
        </ButtonGroup>
        </div>
    </div>

    );
  }
}
export default Group;
