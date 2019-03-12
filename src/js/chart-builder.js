import React from 'react';
import ReactDOM from 'react-dom';
import ChartNode from './chart-node';

class ChartBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [] };
  }

  handleClick(e) {
    let rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({
      nodes: [
        ...this.state.nodes,
        {
          x: e.nativeEvent.offsetX + rect.x,
          y: e.nativeEvent.offsetY + rect.y
        }
      ]
    });
  }

  render() {
    let nodes = this.state.nodes.map((node, index) => {
      return <ChartNode key={index} x={node.x} y={node.y} />;
    });

    return (
      <div id="chart-builder" onClick={e => this.handleClick(e)}>
        <h1> Chart Builder </h1>
        {nodes}
      </div>
    );
  }
}

export default ChartBuilder;
