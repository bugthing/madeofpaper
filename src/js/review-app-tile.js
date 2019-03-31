import React from 'react';

function ReviewAppTile(props) {
  const imgClassName = `buildState-${props.buildState}`;

  return (
    <div className="tile">
      <div>
        <h1> {props.branchName} </h1>
        <h2> {props.branchText} </h2>

        <img className={imgClassName} />

        <div>
          <button>Build Now</button>
          <button>Stop</button>
        </div>
      </div>
    </div>
  );
}

ReviewAppTile.defaultProps = {
  branchName: 'master',
  buildState: 'ready',
  branchText: 'some text about branch, last commit perhaps'
};

export default ReviewAppTile;
