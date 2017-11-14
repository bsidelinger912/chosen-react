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
      minSearchCharacters: PropTypes.number,
    }

    static defaultProps = {
      className: '',
      multiSelect: false,
      placeholderText: 'Choose one',
      minSearchCharacters: 2,
    }

    constructor(props) {
      super();

      this.state = {
        selected: { text: props.placeholderText, placeholder: true },
        currentOptions: props.options,
        searchTerm: '',
      };

      this.search = this.search.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.removeSelected = this.removeSelected.bind(this);
    }

    onSelect(value) {
      const { options } = this.props;
      const thisSelected = options.find(option => option.value === value);

      let selected = thisSelected;
      if (this.props.multiSelect) {
        if (Array.isArray(this.state.selected)) {
          selected = this.state.selected.concat(thisSelected);
        } else {
          selected = [thisSelected];
        }
      }

      this.setState({ selected, currentOptions: options });
    }

    removeSelected(index) {
      const selected = [...this.state.selected];
      selected.splice(index, 1);

      if (selected.length < 1) {
        return this.setState({ selected: { text: this.props.placeholderText, placeholder: true } });
      }

      this.setState({ selected });
    }

    search(e) {
      // TODO: need to stop the form submit here, which this isn't doing
      e.stopPropagation();

      const { target: { value: searchTerm } } = e;
      const { minSearchCharacters, options } = this.props;
      const searchTermLower = searchTerm.toLowerCase();

      if (searchTerm.length < minSearchCharacters) {
        return this.setState({ currentOptions: options });
      }

      const currentOptions = options.filter(option => option.text.toLowerCase().indexOf(searchTermLower) > -1);

      this.setState({ currentOptions });
    }

    render() {
      return (
        <Component
          {...{
            ...this.props,
            selected: this.state.selected,
            search: this.search,
            onSelect: this.onSelect,
            options: this.state.currentOptions,
            removeSelected: this.removeSelected,
          }}
        />
      );
    }
  }
);
