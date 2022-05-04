import React from "react";
import { useEffect, useState } from "react";
function Dropdown(props) {
  const { statusDropdown, getWeather, getForeCast, activeDropdown } = props;
  const listCity = ["Ho Chi Minh City", "Ha Noi", "Vinh", "Hue", "Da Nang"];
  const continent = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  let [dropdown, setDropdown] = useState([]);
  function handleClick(e, city) {
    switch (statusDropdown) {
      case "Global":
        handleDisplayCountry(e, city);
        console.log("global");
        break;
      case "Local":
        getDataWeather(city);
        break;
      default:
        break;
    }
  }
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
                getDataWeather(country.name.common);
              }}
              key={country.name.common}
            >
              {country.name.common}
            </li>
          );
        });
      })

      .then(() => {
        setDropdown(element);
      })
      .catch(function (err) {
        console.log(err);
      });
  } // onclick call api display country of continent
  function getDataWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") return;
        getWeather([data]);
      })
      .catch((err) => console.log(err));
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") return;
        getForeCast(data);
      })
      .catch((err) => console.log(err));
    activeDropdown();
  } //call api get weather
  function displayDropdown(item) {
    return (
      <li
        className="p-2 text-black hover:bg-sky-500 hover:text-white"
        key={item}
        onClick={(e) => handleClick(e, item)}
      >
        {item}
      </li>
    );
  }

  useEffect(() => {
    function setDropdownElement(statusDropdown) {
      let element;
      switch (statusDropdown) {
        case "Local":
          element = listCity.map(displayDropdown);
          setDropdown(element);
          break;
        case "Global":
          element = continent.map(displayDropdown);
          setDropdown(element);
          break;
        default:
          setDropdown([]);
          break;
      }
    }
    setDropdownElement(statusDropdown);
  }, [statusDropdown]);
  return (
    <ul
      style={{ display: statusDropdown ? "block" : "none" }}
      className="absolute top-full z-10 w-40 rounded bg-white dropdown-menu 
  max-h-96 overflow-auto  "
    >
      {dropdown}
    </ul>
  );
}

export default Dropdown;
