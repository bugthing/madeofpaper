import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';
import ChartNode from './chart-node';
import ChartLine from './chart-line';
import NodeModal from './node-modal';
import { ChartContext } from './chart-context';

const defaultNodeName = 'Node';

class ChartBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleNodeDoubleClick = this.handleNodeDoubleClick.bind(this);
    this.handleNodeNameChange = this.handleNodeNameChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);

    this.state = {
      title: 'Some chart',
      nodes: {},
      selectedUuid: undefined,
      openModal: false
    };
  }

  handleNodeNameChange(newName) {
    this.state.nodes[this.state.selectedUuid].name = newName;
    this.setState({ nodes: { ...this.state.nodes } });
  }

  handleCloseModal() {
    this.setState({ openModal: false });
  }

  handleDeleteNode() {
    delete this.state.nodes[this.state.selectedUuid];
    this.setState({ nodes: { ...this.state.nodes }, openModal: false });
  }

  handleNodeClick(e, nodeProps) {
    this.setState({ selectedUuid: nodeProps.uuid });
    e.stopPropagation();
  }

  handleNodeDoubleClick(e, nodeProps) {
    this.setState({ openModal: true });
  }

  handleSpaceKeyPress(e) {
    if (e.key == 'Enter' && this.state.selectedUuid) {
      this.setState({ openModal: true });
    }
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
          if (parentNode) {
            return (
              <ChartLine key={index} start_x={parentNode.x} start_y={parentNode.y} end_x={node.x} end_y={node.y} />
            );
          }
        }
      })
      .filter(Boolean);

    return <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>{lines}</svg>;
  }

  renderModel() {
    if (!this.state.openModal) return false;
    return (
      <NodeModal
        defaultNodeName={defaultNodeName}
        changeNodeName={this.handleNodeNameChange}
        closeModal={this.handleCloseModal}
        deleteNode={this.handleDeleteNode}
      />
    );
  }

  render() {
    return (
      <ChartContext.Provider value={this.state}>
        <div id="chart-builder" onClick={e => this.handleSpaceClick(e)}>
          <h1> Chart Builder: {this.state.title} </h1>
          {this.renderLines()}
          {this.renderNodes()}
          {this.renderModel()}
        </div>
      </ChartContext.Provider>
    );
  }
}

export default ChartBuilder;
