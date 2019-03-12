import React from 'react';

class ChartNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        position: 'absolute',
        left: `${this.props.x}px`,
        top: `${this.props.y}px`
      }
    };
  }

  render() {
    return (
      <div style={this.state.styles} width="20" height="20">
        N
      </div>
    );
  }
}

export default ChartNode;
