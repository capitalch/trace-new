import * as React from "react";
import { Tooltip,Button } from 'antd';

class BasicTip extends React.Component {
 
   render() {
    return (
        <div>
            <div>
                <Tooltip title="prompt text">
                    <span className="sm-block">Tooltip will show on mouse enter.</span>
                </Tooltip>
                <Tooltip placement="topLeft" title="Prompt Text">
                    <Button style={{ marginLeft: '10px'}} className="m-t-5 m-b-5">Align edge</Button>
                </Tooltip>
                <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
                    <Button style={{ marginLeft: '10px'}} className="m-t-5 m-b-5">Arrow points to center</Button>
                </Tooltip>

            </div>
            <div >
                
            </div>
            <div style={{ marginBottom: '20px', marginTop: '20px'}}>
                
                </div>
            </div>
    );
  }
}
export default BasicTip;
