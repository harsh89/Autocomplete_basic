import { useEffect, useRef } from "react";

const ResultList = (props) => {
  const ulRef = useRef(null);
  useEffect(() => {
    console.log("inside event");
    console.log(ulRef);

    props.initiateFocus ? ulRef.current.firstChild.focus() : null;
    return () => props.setInitiateFocus(false);
  }, [props.initiateFocus]);

  return (
    <ul className="suggestion-list" ref={ulRef} role="listbox">
      {props.searchTerm !== "" &&
        props.searchResult.map((res, index) => (
          <li className="suggestion-list-item" key={index}>
            {res.name.common}
          </li>
        ))}

      {props.searchTerm === "" &&
        props.initialData.map((res, index) => (
          <li
            tabindex="0"
            className="suggestion-list-item"
            key={index}
            role="option"
          >
            {res.name.common}
          </li>
        ))}
    </ul>
  );
};

export default ResultList;
