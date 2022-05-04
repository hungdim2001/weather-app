import "./App.css";
import React from "react";
import Search from "./component/Search";
import Local from "./component/Local";
import Weather from "./component/Weather";
import { useState, useEffect } from "react";
import Global from "./component/Global";
import Forecast from "./component/Forecast";
import Dropdown from "./component/Dropdown";
import { useRef } from "react";
function App() {
  let [listWeather, setListWeather] = useState([]);
  let [foreCast, setForeCast] = useState(); // state store forecast and weather
  let localRef = useRef(null);
  let globalRef = useRef(null); // ref store Global Element and localElement
  let [activeLocal, setActiveLocal] = useState(false);
  let [activeGlobal, setActiveGlobal] = useState(false); // active dropdown
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
    console.log(data);
  }; //  set state forecast
  const getWeather = (data) => {
    setListWeather(data);
  }; // set state weather
  function setActiveDropdown(data) {
    setStatusDropdown(data);
  }
  function activeDropdown(data) {
    switch (data) {
      case "global":
        setActiveGlobal(!activeGlobal);
        setActiveLocal(false);
        break;
      case "local":
        setActiveLocal(!activeLocal);
        setActiveGlobal(false);
        break;
      default:
        setActiveGlobal(false);
        setActiveLocal(false);
        break;
    }
  } // close dropdown
  function handleClick(e) {
    switch (statusDropdown) {
      case "global":
        setStatusDropdown(null);
        console.log(e.target.innerText);
        break;
      case "local":
        setStatusDropdown(null);
        console.log(e.target.innerText);

        break;
      default:
        setStatusDropdown(e.target.innerText);
        console.log(e.target.innerText);
        break;
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
            <div className="nav-bar">
              <div className="local" onClick={handleClick}>
                {" "}
                local
              </div>
              <div className="global" onClick={handleClick}>
                global
              </div>
              <Dropdown
                getWeather={getWeather}
                getForeCast={getForeCast}
                statusDropdown={statusDropdown}
                setActiveDropdown={setActiveDropdown}
              ></Dropdown>
            </div>
            {/* <Local
              ref={localRef}
              getWeather={getWeather}
              activeDropdown={activeDropdown}
              activeLocal={activeLocal}
              getForeCast={getForeCast}
            ></Local>
            <Global
              ref={globalRef}
              getWeather={getWeather}
              activeDropdown={activeDropdown}
              activeGlobal={activeGlobal}
              getForeCast={getForeCast}
            /> */}

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
