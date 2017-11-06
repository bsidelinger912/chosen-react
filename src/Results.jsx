/**
 * @class Results
 * @description
 */

import React from 'react';
import PropTypes from 'prop-types';

class Results extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })).isRequired,
    dropVisible: PropTypes.bool.isRequired,
    itemSelected: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired,
  }

  constructor() {
    super();

    this.selectLi = this.selectLi.bind(this);
  }

  selectLi(value) {
    this.props.itemSelected(value);
  }

  render() {
    const { options, activeIndex } = this.props;

    const liElements = options.map((option, index) => {
      const ref = (index === 0) ? (li) => { this.firstLi = li; } : undefined;

      return (
        <li
          {...{
            className: (index === activeIndex) ? 'chosen-react__results__active' : '',
            ref,
            tabIndex: 1,
            key: option.value,

            // TODO: no lamda
            onClick: () => this.selectLi(option.value),
            onMouseOver: () => this.props.setActiveIndex(index),
          }}
        >
          {option.text}
        </li>
      );
    });

    return (
      <ul className="chosen-react__results">
        {liElements}
      </ul>
    );
  }
}

export default Results;
