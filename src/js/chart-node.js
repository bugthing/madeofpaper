import React from 'react';

class ChartNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Node',
      styles: {
        position: 'absolute',
        left: `${this.props.x}px`,
        top: `${this.props.y}px`
      }
    };
  }

  handleClick(e) {
    console.log('node clicked');
    e.stopPropagation();
  }

  render() {
    return (
      <div className="node-container" style={this.state.styles} onClick={e => this.handleClick(e)}>
        <div className="node">{this.state.title}</div>
      </div>
    );
  }
}

export default ChartNode;
