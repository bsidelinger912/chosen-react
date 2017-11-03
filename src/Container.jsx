/**
 * @class ChosenContainer
 * @description handles filtering and aggregating selections
 */

import React from 'react';
import PropTypes from 'prop-types';

export default Component => (
  class ChosenContainer extends React.Component {
    static propTypes = {
      className: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })).isRequired,
      multiSelect: PropTypes.bool,
      placeholderText: PropTypes.string,
    }

    static defaultProps = {
      className: '',
      multiSelect: false,
      placeholderText: 'Choose one',
    }

    constructor(props) {
      super();

      this.state = { ...props, selected: props.multiSelect ? [] : { text: props.placeholderText } };

      this.search = this.search.bind(this);
      this.onSelect = this.onSelect.bind(this);
    }

    onSelect(value) {
      const thisOption = this.props.options.find(option => option.value === value);
      if (this.props.multiSelect) {
        // TODO: implement
      } else {
        this.setState({ selected: thisOption })
      }
    }

    search(e) {
      const value = e.target.value;

      console.log(this.state);
      console.log(value);
    }

    render() {
      const selected = this.props.multiselect ? [] : this.state.selected.text;
      return (
        <Component {...{ ...this.state, selected, search: this.search, onSelect: this.onSelect }} />
      );
    }
  }
);
