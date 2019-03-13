import React from 'react';

class ChartLine extends React.Component {
  render() {
    return (
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
        <line
          style={{ 'stroke-width': '2px', stroke: 'rgb(255,255,255)' }}
          x1={this.props.start_x}
          y1={this.props.start_y}
          x2={this.props.end_x}
          y2={this.props.end_y}
        />
      </svg>
    );
  }
}

export default ChartLine;
