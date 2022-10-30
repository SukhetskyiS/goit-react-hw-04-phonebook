import PropTypes from 'prop-types';

export function Filter({ searchForm, filter }) {
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

Filter.propTypes = {
  searchForm: PropTypes.func,
  filter: PropTypes.string,
};
