import React, { useState } from "react";
import "./SearchBar.css";
import { TiTick } from "react-icons/ti";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
        console.log(value)
      return value.subject ? value.subject.toLowerCase().includes(searchWord.toLowerCase()) : null;

    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="">
      <div >
        <input
        className="border-2 rounded-2xl border-black-500 p-[10px] mb-[2vh] w-[50vh]"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length != 0 && (
        <div>
          {filteredData.slice(0,3).map((value, key) => {
            return (
            <div key={key} >
                <p >{value.subject}</p>
                {/* <p  className="dataItem">{value.name}</p> */}
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
