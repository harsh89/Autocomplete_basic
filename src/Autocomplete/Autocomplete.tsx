import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "./useDebounce";
import Searchbar from "./Searchbar";
import ResultList from "./ResultList";

export interface IAutocomplete {
  debouncetime: number;
  maxResults: number;
}

const Autocomplete: React.FunctionComponent<IAutocomplete> = (props) => {
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initiateFocus, setInitiateFocus] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, props.debouncetime);
  const maxRows = props.maxResults;
  const initialData = [
    {
      name: {
        common: "India",
      },
    },
    {
      name: {
        common: "Canada",
      },
    },
  ];
  useEffect(() => {
    axios("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
      return;
    }
    setSearchResult(
      countries
        .filter((country) =>
          country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .splice(0, maxRows)
    );
    return () => setSearchResult([]);
  }, [debouncedSearchTerm]);

  // useEffect(() => {
  //   const printConsole = setTimeout(() => {
  //     console.log("search Term", searchTerm);
  //   }, 3000);
  //   return () => clearTimeout(printConsole);
  // }, [searchTerm]);

  const inpKeyDown = (e) => {
    if (e.which === 40) {
      console.log(e.which);

      setInitiateFocus(true);
    }
  };

  return (
    <div className="container">
      <Searchbar saveSearch={setSearchTerm} inpKeyDown={inpKeyDown}></Searchbar>
      <ResultList
        searchTerm={searchTerm}
        searchResult={searchResult}
        initialData={initialData}
        initiateFocus={initiateFocus}
        setInitiateFocus={setInitiateFocus}
      ></ResultList>
    </div>
  );
};

export default Autocomplete;
