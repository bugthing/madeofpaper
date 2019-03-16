import React from 'react';
import ReactDOM from 'react-dom';
import ChartNode from './chart-node';
import ChartLine from './chart-line';
import { ChartContext } from './chart-context';

class ChartBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], lines: [] };
  }

  handleNodeClick(e) {
    console.log('node clicked:');
    e.stopPropagation();
  }

  handleSpaceClick(e) {
    let nodes = [
      ...this.state.nodes,
      {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      }
    ];
    this.setState({ nodes: nodes });
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
    return (
      <ChartContext.Provider value={this.state}>
        <div id="chart-builder" onClick={e => this.handleSpaceClick(e)}>
          <h1> Chart Builder: {this.context.title} </h1>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>{lines}</svg>
          {nodes}
        </div>
      </ChartContext.Provider>
    );
  }
}
ChartBuilder.contextType = ChartContext;

export default ChartBuilder;
