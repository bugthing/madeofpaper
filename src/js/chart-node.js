import React from 'react';

const ChartNode  = ( { name, x, y, clickNode } ) => (
  <div className="node-container" style={{position: 'absolute', left: `${x}px`, top: `${y}px`}} onClick={clickNode}>
    <div className="node">{name}</div>
  </div>
)

export default ChartNode;
