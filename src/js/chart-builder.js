import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';
import ChartNode from './chart-node';
import ChartLine from './chart-line';
import { ChartContext } from './chart-context';

const defaultNodeName = 'Node';

class ChartBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: {}, selectedUuid: undefined };
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleNodeDoubleClick = this.handleNodeDoubleClick.bind(this);
  }

  handleNodeClick(e, nodeProps) {
    this.setState({ selectedUuid: nodeProps.uuid });
    e.stopPropagation();
  }

  handleNodeDoubleClick(e, nodeProps) {
    this.setState({ openModal: true });
  }

  handleModalKeyPress(e) {
    if (e.key == 'Enter') {
      this.setState({ openModal: false });
    }
  }

  handleNodeNaming(e) {
    const newName = event.target.value;
    this.state.nodes[this.state.selectedUuid].name = newName;
    this.setState({ nodes: { ...this.state.nodes } });
  }

  handleSpaceClick(e) {
    if (this.state.openModal) {
      return false;
    }
    const uuid = uuidv1();
    const newNode = {
      uuid: uuid,
      name: defaultNodeName,
      parentUuid: this.state.selectedUuid,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };
    const nodes = { ...this.state.nodes, [uuid]: newNode };

    this.setState({ nodes: nodes, selectedUuid: uuid });
  }

  renderNodes() {
    const nodes = Object.keys(this.state.nodes).map((nodeUuid, index) => {
      const node = this.state.nodes[nodeUuid];
      node.selected = node.uuid === this.state.selectedUuid ? true : false;

      return <ChartNode key={index} clickNode={this.handleNodeClick} editNode={this.handleNodeDoubleClick} {...node} />;
    });

    return nodes;
  }

  renderLines() {
    const lines = Object.keys(this.state.nodes)
      .map((nodeUuid, index) => {
        const node = this.state.nodes[nodeUuid];

        if (node.parentUuid !== undefined) {
          let parentNode = this.state.nodes[node.parentUuid];
          return <ChartLine key={index} start_x={parentNode.x} start_y={parentNode.y} end_x={node.x} end_y={node.y} />;
        }
      })
      .filter(Boolean);

    return <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>{lines}</svg>;
  }

  renderModel() {
    if (this.state.openModal) {
      let value = this.state.nodes[this.state.selectedUuid].name;
      if (value === defaultNodeName) {
        value = '';
      }
      return (
        <div className="modal-container">
          <div className="modal-content">
            <input
              autoFocus
              name="nodeName"
              onKeyPress={e => this.handleModalKeyPress(e)}
              onChange={e => this.handleNodeNaming(e)}
              value={value}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <ChartContext.Provider value={this.state}>
        <div id="chart-builder" onClick={e => this.handleSpaceClick(e)}>
          <h1> Chart Builder: {this.context.title} </h1>
          {this.renderLines()}
          {this.renderNodes()}
          {this.renderModel()}
        </div>
      </ChartContext.Provider>
    );
  }
}

export default ChartBuilder;
