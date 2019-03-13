import React from 'react';
import ReactDOM from 'react-dom';
import ChartNode from './chart-node';
import ChartLine from './chart-line';

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

    let lines = this.state.nodes
      .reduce((acc, v, i, a) => {
        if (i < a.length - 1) {
          acc.push([a[i], a[i + 1]]);
        }
        return acc;
      }, [])
      .map((pair, index) => {
        return <ChartLine key={index} start_x={pair[0].x} start_y={pair[0].y} end_x={pair[1].x} end_y={pair[1].y} />;
      });

    return (
      <div id="chart-builder" onClick={e => this.handleClick(e)}>
        <h1> Chart Builder </h1>
        {nodes}
        {lines}
      </div>
    );
  }
}

export default ChartBuilder;
