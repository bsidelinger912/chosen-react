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
    removeSelected: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = { dropVisible: false, activeIndex: 0 };

    this.toggleOpenClosed = this.toggleOpenClosed.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
    this.setActiveIndex = this.setActiveIndex.bind(this);
    this.keyUp = this.keyUp.bind(this);
  }

  onSelect(value) {
    this.setState({ dropVisible: false });
    this.searchInput.value = '';

    this.props.onSelect(value);
  }

  // TODO: move to container?
  setActiveIndex(index) {
    this.setState({ activeIndex: index });
  }

  // TODO: move to container?
  keyUp(e) {
    const { activeIndex } = this.state;
    const { options } = this.props;

    // up
    if (e.which === 38) {
      this.setState({ activeIndex: (activeIndex > 0) ? activeIndex - 1 : activeIndex });

    // down
    } else if (e.which === 40) {
      this.setState({ activeIndex: (activeIndex < options.length) ? activeIndex + 1 : activeIndex });

    // enter
    } else if (e.which === 13) {
      this.onSelect(options[activeIndex].value);
    }
  }

  // TODO: move to container?
  removeSelected(e) {
    e.stopPropagation();

    this.props.removeSelected(e.currentTarget.value);
  }

  toggleOpenClosed() {
    if (!this.state.dropVisible) {
      setTimeout(() => this.searchInput.focus(), 0);
      this.setState({ activeIndex: 0 });
    }

    this.setState({ dropVisible: !this.state.dropVisible });
  }

  render() {
    const { className, options, search, selected } = this.props; // eslint-disable-line object-curly-newline
    const { dropVisible, activeIndex } = this.state;

    const normalSelectOptions = options.map(option => (
      <option key={option.value} value={option.value}>{option.text}</option>
    ));

    const arrowComponent = dropVisible ? <UpArrow /> : <DownArrow />;

    const selectedEl = (typeof selected === 'string')
      ? selected
      : (
        <ul className="chosen-react__current__items">
          {selected.map((text, index) => (
            <li key={text}>
              {text}
              <button value={index} onClick={this.removeSelected}>&times;</button>
            </li>
          ))}
        </ul>
      );

    const chosenClass = (typeof selected === 'string') ? 'chosen-react__current' : 'chosen-react__current--multi';

    return (
      <div className="chosen-react" role="presentation" onKeyUp={this.keyUp}>
        <select style={{ display: 'none' }}>
          {normalSelectOptions}
        </select>
        <div className={`chosen-react__container ${className}`}>
          <a
            className={chosenClass}
            onClick={this.toggleOpenClosed}
            onKeyPress={this.toggleOpenClosed}
            role="presentation"
          >
            {selectedEl}

            <span className="chosen-react__arrow">
              {arrowComponent}
            </span>
          </a>
          <div className="chosen-react__drop" style={{ display: dropVisible ? 'block' : 'none' }}>
            <div className="chosen-react__search">
              <input type="text" onKeyUp={search} ref={(input) => { this.searchInput = input; }} />
            </div>

            <Results
              {...{
                options,
                dropVisible,
                activeIndex,
                itemSelected: this.onSelect,
                setActiveIndex: this.setActiveIndex,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default container(Chosen);
