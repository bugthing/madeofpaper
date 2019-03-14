import '../css/common.css';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ChartBuilder from './chart-builder';
import {ChartContext} from './chart-context';

class App extends React.Component {
  render() {
    return (
      <ChartContext.Provider>
        <ChartBuilder />
      </ChartContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
