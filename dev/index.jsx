/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

// import Chosen from '../src';

import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        Hello world
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
