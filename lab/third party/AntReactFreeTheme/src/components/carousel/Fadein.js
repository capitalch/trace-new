import * as React from 'react';
import {Carousel} from 'antd';

class FadeinCareousel extends React.Component {
  render () {
    return (
      <div>
        <Carousel effect="fade" autoplay>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
        <p className="m-t-5">Slides use fade for transition.</p>
      </div>
    );
  }
}
export default FadeinCareousel;
