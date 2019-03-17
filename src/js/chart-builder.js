import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';
import ChartNode from './chart-node';
import ChartLine from './chart-line';
import { ChartContext } from './chart-context';

class ChartBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: {}, selectedUuid: undefined };
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleNodeClick(e, nodeProps) {
    this.setState({ selectedUuid: nodeProps.uuid });
    e.stopPropagation();
  }

  handleSpaceClick(e) {
    const uuid = uuidv1();
    const newNode = {
      uuid: uuid,
      name: `Node`,
      parentUuid: this.state.selectedUuid,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };
    const nodes = { ...this.state.nodes, [uuid]: newNode };

    this.setState({ nodes: nodes, selectedUuid: uuid });
  }

  render() {
    const nodes = Object.keys(this.state.nodes).map((nodeUuid, index) => {
      const node = this.state.nodes[nodeUuid];
      node.selected = node.uuid === this.state.selectedUuid ? true : false;

      return <ChartNode key={index} clickNode={this.handleNodeClick} {...node} />;
    });

    const lines = Object.keys(this.state.nodes)
      .map((nodeUuid, index) => {
        const node = this.state.nodes[nodeUuid];

        if (node.parentUuid !== undefined) {
          let parentNode = this.state.nodes[node.parentUuid];
          return <ChartLine key={index} start_x={parentNode.x} start_y={parentNode.y} end_x={node.x} end_y={node.y} />;
        }
      })
      .filter(Boolean);

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

export default ChartBuilder;
