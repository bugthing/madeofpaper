import React from 'react';

const ChartLine = ({ start_x, start_y, end_x, end_y }) => (
  <line style={{ strokeWidth: '2px', stroke: 'rgb(255,255,255)' }} x1={start_x} y1={start_y} x2={end_x} y2={end_y} />
);

export default ChartLine;
