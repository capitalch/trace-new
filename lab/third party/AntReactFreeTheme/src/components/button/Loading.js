import * as React from "react";
import { Button } from 'antd';



class Loading extends React.Component {
    state = {
        loading: false,
        iconLoading: false,
      };
    
      enterLoading = () => {
        this.setState({ loading: true });
      };
    
      enterIconLoading = () => {
        this.setState({ iconLoading: true });
      };
  render() {

      return (
        <div>
        <Button type="primary" loading={true} className='m-r-10 m-b-5'>
          Loading
        </Button>
        <Button type="primary" size="small" loading className='m-r-10 m-b-5'>
          Loading
        </Button>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading} className='m-r-10 m-b-5'>
          Click me!
        </Button>
       
        <Button shape="circle" loading   className='m-r-10 m-t-10 m-b-5'/>
        <Button type="primary" shape="circle" loading  className="spin m-b-5"/>
      </div>

    );
  }
}
export default Loading;
