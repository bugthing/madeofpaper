import React from 'react';
import { ChartContext } from './chart-context';

class NodeModal extends React.Component {
  handleModalKeyPress(e) {
    if (e.key == 'Enter') this.props.closeModal();
  }

  handleNodeNaming(e) {
    this.props.changeNodeName(e.target.value);
  }

  handleNodeDelete(e, nodeProps) {
    this.props.deleteNode();
  }

  isLeafNode() {
    return Object.keys(this.context.nodes).find(nodeUuid => {
      return this.context.nodes[nodeUuid].parentUuid === this.context.selectedUuid;
    });
  }

  renderDeleteButton() {
    if (!this.isLeafNode()) {
      return <div onClick={e => this.handleNodeDelete(e)}> x </div>;
    }
  }

  render() {
    let value = this.context.nodes[this.context.selectedUuid].name;
    if (value === this.props.defaultNodeName) value = '';

    return (
      <div className="modal-container" onClick={e => this.props.closeModal()}>
        <div className="modal-content">
          <input
            autoFocus
            name="nodeName"
            onKeyPress={e => this.handleModalKeyPress(e)}
            onChange={e => this.handleNodeNaming(e)}
            value={value}
          />
          {this.renderDeleteButton()}
        </div>
      </div>
    );
  }
}

NodeModal.contextType = ChartContext;

export default NodeModal;
