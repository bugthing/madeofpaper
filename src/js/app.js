import '../css/common.css';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ChartBuilder from './chart-builder';

ReactDOM.render(<ChartBuilder />, document.getElementsByTagName('BODY')[0]);

module.hot.accept();
