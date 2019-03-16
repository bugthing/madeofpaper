import '../css/common.css';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ChartBuilder from './chart-builder';

class App extends React.Component {
  render() {
    return <ChartBuilder />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
