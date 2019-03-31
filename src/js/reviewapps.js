import '../css/common.css';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ReviewAppTile from './review-app-tile.js';

class App extends React.Component {
  render() {
    return (
      <div id="review-app">
        <main>
          <ReviewAppTile />
          <ReviewAppTile buildState="building" />
          <ReviewAppTile />
          <ReviewAppTile />
          <ReviewAppTile buildState="building" />
          <ReviewAppTile />
          <ReviewAppTile />
          <ReviewAppTile />
          <ReviewAppTile />
          <ReviewAppTile />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
