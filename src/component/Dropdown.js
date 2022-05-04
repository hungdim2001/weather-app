import React from "react";
import { useEffect,useState } from "react";
function Dropdown(props) {
  const { statusDropdown, getWeather, getForeCast, setActiveDropdown } = props;
  const listCity = ["Ho Chi Minh City", "Ha Noi", "Vinh", "Hue", "Da Nang"];
  const continent = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  let [dropdown, setDropdown] = useState([]);
  function handleClick(e, city) {
    switch (statusDropdown) {
      case "global":
        handleDisplayCountry(e, city);
        console.log("global");
        break;
      case "local":
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
      });
  } // onclick call api display country of continent
  function getDataWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        getWeather([data]);
      })
      .catch((err) => console.log(err));
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        getForeCast(data);
      })
      .catch((err) => console.log(err));
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
        case "local":
          console.log("local");
          element = listCity.map(displayDropdown);
          console.log(element)
          setDropdown(element);
          break;
        case "global":
          console.log("global");
          element = continent.map(displayDropdown);
          console.log(element)
          setDropdown(element);
          break;
        default:
          setDropdown([]);
          break;
      }
    }
    setDropdownElement(statusDropdown);
  }, [statusDropdown]);
  return <div>{dropdown}</div>;
}

export default Dropdown;
