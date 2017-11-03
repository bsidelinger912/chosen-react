/**
 * @class Chosen
 * @description main entry point
 */

import React from 'react';
import PropTypes from 'prop-types';

import DownArrow from './icons/DownArrow';
import UpArrow from './icons/UpArrow';
import Results from './Results';

import './chosen.scss';

class Chosen extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })).isRequired,
  }

  static defaultProps = {
    className: '',
  }

  constructor() {
    super();

    this.state = { dropVisible: false };

    this.onSelect = this.onSelect.bind(this);
    this.toggleOpenClosed = this.toggleOpenClosed.bind(this);
  }

  onSelect(e) {
    console.log('******');
    console.log(e);
    console.log(this.state);
  }

  toggleOpenClosed() {
    this.setState({ dropVisible: !this.state.dropVisible });
  }

  search(e) {
    const value = e.target.value;

    console.log(this.state);
    console.log(value);
  }

  render() {
    const { className, options } = this.props;
    const { dropVisible } = this.state;

    const normalSelectOptions = options.map(option => (
      <option key={option.value} value={option.value}>{option.text}</option>
    ));

    const arrowComponent = dropVisible ? (
      <DownArrow onClick={this.toggleOpenClosed} />
    ) : (
      <UpArrow />
    );

    return (
      <div className="chosen-react">
        <select style={{ display: 'none' }}>
          {normalSelectOptions}
        </select>
        <div className={`chosen-react__container ${className}`}>
          <a className="chosen-react__current" onClick={this.toggleOpenClosed}>
            Make me take current value
            <span className="chosen-react__arrow">
              {arrowComponent}
            </span>
          </a>
          <div className="chosen-react__drop" style={{ display: dropVisible ? 'block' : 'none' }}>
            <div className="chosen-react__search">
              <input type="text" onKeyUp={this.search} />
            </div>

            <Results {...{ options, dropVisible, itemSelected: this.onSelect }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Chosen;
