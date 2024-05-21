const Searchbar = (props) => {
  return (
    <div className="search-bar">
      <input
        onChange={(e) => props.saveSearch(e.target.value)}
        onKeyDown={props.inpKeyDown}
        type="text"
        placeholder="Enter your search query"
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
      />
    </div>
  );
};

export default Searchbar;
