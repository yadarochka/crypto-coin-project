const Search = ({ ...inputProps }, { ...buttonProps }) => {
  return (
    <div>
      <input {...inputProps}></input>
      <button {...buttonProps}>Cancel</button>
    </div>
  );
};

export default Search;
