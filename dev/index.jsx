/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import Chosen from '../src';
import states from './states';

import './index.scss';

class App extends React.Component {
  render() {
    const options = states;

    const normalSelectOptions = options.map(option => (
      <option key={option.value} value={option.value}>{option.text}</option>
    ));

    const checkBoxOptions = options.map(option => (
      <div key={option.value}>
        <input type="checkbox" value={option.value} id={option.value} />
        <label htmlFor={option.value}>{option.text}</label>
      </div>
    ))

    return (
      <div className="wrapper">
        <h1 className="heading">Chosen React</h1>

        <h2>Standard Select</h2>

        <div className="side-by-side">
          <div>
            <h3>Turns This</h3>

            <select>
              {normalSelectOptions}
            </select>
          </div>

          <div>
            <h3>Into This</h3>
            <Chosen {...{ options }} />
          </div>
        </div>

        <h2>Multi Select</h2>

        <div className="side-by-side">
          <div>
            <h3>Turns This</h3>

            <select multiple>
              {normalSelectOptions}
            </select>
          </div>

          <div>
            <h3>Into This</h3>
            <Chosen {...{ options, multiSelect: true }} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
