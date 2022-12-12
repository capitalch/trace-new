import * as React from 'react';
class Stats extends React.Component {
  render () {
    return (
      <div className="d-flex flex-column stats justify-content-center">
        <h2> {this.props.text}</h2>
        <div className="d-flex justify-content-between">
          <div className="stats-number"> {this.props.number}</div>
          <div> <img src={this.props.icon} /></div>
        </div>
      </div>
    );
  }
}
export default Stats;
