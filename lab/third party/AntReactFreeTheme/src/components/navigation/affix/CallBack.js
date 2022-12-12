import * as React from 'react';
import {Affix, Button} from 'antd';

class CallBack extends React.Component {
  render () {
    return (
      <Affix offsetTop={120} onChange={affixed => console.log (affixed)}>
        <Button>120px to affix top</Button>
      </Affix>
    );
  }
}
export default CallBack;
