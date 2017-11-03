/**
 * @class Results
 * @description
 */

import React from 'react';
import PropTypes from 'prop-types';

export class Results extends React.Component {
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
  }

  constructor() {
    super();

    this.focusFirstLi = this.focusFirstLi.bind(this);
    this.selectLi = this.selectLi.bind(this);
  }

  componentDidMount() {
    this.focusFirstLi();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dropVisible && !this.props.dropVisible) {
      setTimeout(this.focusFirstLi, 0);
    }
  }

  focusFirstLi() {
    this.firstLi.focus();
  }

  selectLi(value) {
    this.props.itemSelected(value);
  }

  render() {
    const { options } = this.props;

    const liElements = options.map((option, index) => {
      const ref = (index === 0) ? (li) => { this.firstLi = li; } : undefined;

      return (
        <li
          {...{
            ref,
            tabIndex: 1,
            key: option.value,
            onClick: () => this.selectLi(option.value),
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
