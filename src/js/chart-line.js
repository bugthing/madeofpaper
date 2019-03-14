import React from 'react';

const ChartLine = ({ start_x, start_y, end_x, end_y }) => (
  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', border: 'thin solid red' }}>
    <line style={{ strokeWidth: '2px', stroke: 'rgb(255,255,255)' }} x1={start_x} y1={start_y} x2={end_x} y2={end_y} />
  </svg>
);

export default ChartLine;
