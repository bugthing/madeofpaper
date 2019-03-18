import React from 'react';

const ChartNode = props => (
  <div
    className="node-container"
    style={{
      position: 'absolute',
      left: `${props.x}px`,
      top: `${props.y}px`,
      border: `${props.selected ? 'thick solid blue' : '0px'}`
    }}
    onClick={e => props.clickNode(e, props)}
    onDoubleClick={e => props.editNode(e, props)}
  >
    <div className="node">{props.name}</div>
  </div>
);

export default ChartNode;
