/**
 * @class Chosen
 * @description main entry point
 */

import React from 'react';
import PropTypes from 'prop-types';

import container from './Container';

import DownArrow from './icons/DownArrow';
import UpArrow from './icons/UpArrow';
import Results from './Results';

import './chosen.scss';

class Chosen extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })).isRequired,
    search: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }

  constructor() {
    super();

    this.state = { dropVisible: false };

    this.toggleOpenClosed = this.toggleOpenClosed.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    this.setState({ dropVisible: false });

    this.props.onSelect(value);
  }

  toggleOpenClosed() {
    this.setState({ dropVisible: !this.state.dropVisible });
  }

  render() {
    const { className, options, onSelect, search, selected } = this.props; // eslint-disable-line object-curly-newline
    const { dropVisible } = this.state;

    const normalSelectOptions = options.map(option => (
      <option key={option.value} value={option.value}>{option.text}</option>
    ));

    const arrowComponent = dropVisible ? (
      <DownArrow onClick={this.toggleOpenClosed} />
    ) : (
      <UpArrow />
    );

    const selectedEl = (typeof selected === 'string') ? selected : null; // TODO: implement multi

    return (
      <div className="chosen-react">
        <select style={{ display: 'none' }}>
          {normalSelectOptions}
        </select>
        <div className={`chosen-react__container ${className}`}>
          <a className="chosen-react__current" onClick={this.toggleOpenClosed}>
            {selectedEl}

            <span className="chosen-react__arrow">
              {arrowComponent}
            </span>
          </a>
          <div className="chosen-react__drop" style={{ display: dropVisible ? 'block' : 'none' }}>
            <div className="chosen-react__search">
              <input type="text" onKeyUp={search} />
            </div>

            <Results {...{ options, dropVisible, itemSelected: this.onSelect }} />
          </div>
        </div>
      </div>
    );
  }
}

export default container(Chosen);
