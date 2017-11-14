/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import serialize from 'form-serialize';

import Chosen from '../src';
import states from './states';

import './index.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = { formData: '' };

    this.getFormData = this.getFormData.bind(this);
  }

  getFormData(e) {
    e.preventDefault();

    const data = serialize(this.formRef, { hash: true });

    console.log(data);
  }

  render() {
    const { formData } = this.state;

    const options = states;

    const normalSelectOptions = options.map(option => (
      <option key={option.value} value={option.value}>{option.text}</option>
    ));

    return (
      <div className="wrapper">
        <h1 className="heading">Chosen React</h1>

        <form onSubmit={this.getFormData} ref={(form) => { this.formRef = form; }}>
          <h2>Standard Select</h2>

          <div className="side-by-side">
            <div>
              <h3>Turns This</h3>

              <select name="testselect" id="testselect">
                {normalSelectOptions}
              </select>
            </div>

            <div>
              <h3>Into This</h3>
              <Chosen
                options={options}
                fieldName="testchosen"
              />
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

          <div className="button-row">
            <button type="submit">Serialize form</button>
          </div>
          <div>
            {formData}
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
