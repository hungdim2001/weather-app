import "./App.css";
import React from "react";
import Search from "./component/Search";
import Weather from "./component/Weather";
import { useState, useEffect } from "react";
import Forecast from "./component/Forecast";
import Dropdown from "./component/Dropdown";
import { useRef } from "react";
function App() {
  let [listWeather, setListWeather] = useState([]);
  let [foreCast, setForeCast] = useState(); // state store forecast and weather
  let localRef = useRef(null);
  let globalRef = useRef(null); // ref store Global Element and localElement

  let [statusDropdown, setStatusDropdown] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        getWeather([data]);
      })
      .catch((err) => console.log(err));
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=hanoi&appid=825ef309eff266f2850c2ce07228190e`
    )
      .then((res) => res.json())
      .then((data) => {
        getForeCast(data);
      })
      .catch((err) => console.log(err));
  }, []); // call api

  const getForeCast = (data) => {
    setForeCast(data);
  }; //  set state forecast
  const getWeather = (data) => {
    setListWeather(data);
  }; // set state weather

  function activeDropdown() {
    if (statusDropdown) {
      setStatusDropdown(null);
    }
  } // close dropdown
  function handleClick(e) {
    if (statusDropdown) {
      setStatusDropdown(null);
    } else {
      setStatusDropdown(e.target.innerText);
    }
  }
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (localRef.current !== e.target && globalRef.current !== e.target) {
        setStatusDropdown(null);
      }
    });
  }, []); //  detect click outside element react
  return (
    <div className="app">
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96 wrapper">
          <div className="flex justify-between mb-3 px-4 items-center pt-4 ">
            <div className="nav-bar flex justify-between mb-3  items-center pt-4">
              <div
                ref={localRef}
                className="local  relative
      text-white
      hover:text-blue-600   
      cursor-pointer"
                onClick={handleClick}
              >
                {" "}
                Local
                <div
                  style={{
                    display: statusDropdown === "Local" ? "block" : "none",
                  }}
                >
                  <Dropdown
                    getWeather={getWeather}
                    getForeCast={getForeCast}
                    statusDropdown={statusDropdown}
                    activeDropdown={handleClick}
                  ></Dropdown>
                </div>
              </div>
              <div
                ref={globalRef}
                className="global   relative
                ml-2
         text-white
         hover:text-blue-600
      cursor-pointer"
                onClick={handleClick}
              >
                Global
                <div
                  style={{
                    display: statusDropdown === "Global" ? "block" : "none",
                  }}
                >
                  <Dropdown
                    getWeather={getWeather}
                    getForeCast={getForeCast}
                    statusDropdown={statusDropdown}
                    activeDropdown={handleClick}
                  ></Dropdown>
                </div>
              </div>
            </div>

            <Search getWeather={getWeather} getForeCast={getForeCast}></Search>
          </div>

          <Weather listWeather={listWeather}></Weather>
          <Forecast foreCast={foreCast}></Forecast>
        </div>
      </div>
    </div>
  );
}

export default App;
