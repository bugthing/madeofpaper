import '../css/common.css';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ChartBuilder from './chart-builder';

ReactDOM.render(<ChartBuilder />, document.getElementById('app'));

module.hot.accept();
