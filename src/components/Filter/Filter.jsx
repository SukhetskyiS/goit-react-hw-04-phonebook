import { Component } from 'react';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    const { searchForm, filter } = this.props;
    return (
      <>
        <label htmlFor="filter">Find contacts by name</label>
        <input
          className="contact-form__search"
          id="filter"
          type="text"
          name="filter"
          value={filter}
          onChange={searchForm}
        />
      </>
    );
  }
}
Filter.propTypes = {
  searchForm: PropTypes.func,
  filter: PropTypes.string,
};
