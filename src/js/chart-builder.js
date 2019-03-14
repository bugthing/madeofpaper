import React from 'react';
import ReactDOM from 'react-dom';
import ChartNode from './chart-node';
import ChartLine from './chart-line';
import ChartContext from './chart-context';

class ChartBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [] };
  }

  handleNodeClick(e) {
    console.log('node clicked:');
    e.stopPropagation();
  }

  handleSpaceClick(e) {
    console.log('space clicked:');
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
      return <ChartNode key={index} name="Node" x={node.x} y={node.y} clickNode={this.handleNodeClick} />;
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

    let props = this.props;
    let stuff = this.context;
    console.log('FUCK', stuff, props);
    return (
      <div id="chart-builder" onClick={e => this.handleSpaceClick(e)}>
        <h1> Chart Builder </h1>
        {nodes}
      </div>
    );
  }
}
ChartBuilder.contextType = ChartContext;

export default ChartBuilder;
