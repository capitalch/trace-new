import * as React from 'react';
import {Card, Icon, Avatar} from 'antd';

const {Meta} = Card;
class Testimonial extends React.Component {
  render () {
    return (
      <div>
        <Meta
          avatar={
            <Avatar
              src={this.props.img}
              style={{width: '60px', height: '60px'}}
            />
          }
          title={
            <div>
              <p style={{margin: '0'}}>{this.props.name}</p>
              <small>{this.props.designation}</small>
              <div className="socialicons-margin">
                <Icon type="facebook" className="m-r-15" />
                <Icon type="twitter" className="m-r-15" />
                <Icon type="phone" className="m-r-15" />
                <Icon type="skype" className="m-r-15" />
              </div>
            </div>
          }
        />
        <div className="m-t-15">{this.props.description}</div>
      </div>
    );
  }
}
export default Testimonial;
