import React from 'react';

const title = 'Chart Builder';

class ChartBuilder extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
      <div id="chart-builder" onClick={e => this.handleClick(e)}>
        <h1> {title} </h1>
      </div>
    );
  }
}

export default ChartBuilder;
