import React from "react";
import { useState, useEffect } from "react";
const Global = React.forwardRef((props, ref) => {
  const { getWeather, activeDropdown, activeGlobal, getForeCast } = props;
  const continent = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  let continentElement;
  continentElement = continent.map((item) => {
    return (
      <li
        className="p-2 text-black hover:bg-sky-500 hover:text-white"
        key={item}
        onClick={(e) => {
          handleDisplayCountry(e, item);
        }}
      >
        {item}
      </li>
    );
  }); // drop down continent
  useEffect(() => {
    setDropdownElement(continentElement);
  }, [activeGlobal]);// set default element when close dropdown
  const [dropdownElement, setDropdownElement] = useState(continentElement);

  function displayContinent() {
    activeDropdown("global");
  } // active dropdown when click global element
  function handleClickGetWeatherCountry(country) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        getWeather([data]);
      });
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        getForeCast(data);
      })
      .catch((err) => console.log(err));
  } // onclick country call api weather

  function handleDisplayCountry(e, data) {
    let element;
    e.stopPropagation();
    fetch(`https://restcountries.com/v3.1/region/${data}`)
      .then((res) => res.json())
      .then((data) => {
        element = data.map((country) => {
          return (
            <li
              className="p-2 text-black hover:bg-sky-500 hover:text-white"
              onClick={(e) => {
                handleClickGetWeatherCountry(country);
              }}
              key={country.name.common}
            >
              {country.name.common}
            </li>
          );
        });
      })
      .then(() => {
        setDropdownElement(element);
      });
  } // onclick call api display country of continent

  return (
    <div
      ref={ref}
      onClick={displayContinent}
      className="
      relative
         text-white
         hover:text-blue-600
      cursor-pointer
          "
    >
      Global
      <ul
        style={{ display: activeGlobal ? "block" : "none" }}
        className="absolute top-full z-10 w-40 rounded bg-white dropdown-menu 
        max-h-96 overflow-auto  "
      >
        {dropdownElement}
      </ul>
    </div>
  );
});
export default Global;
