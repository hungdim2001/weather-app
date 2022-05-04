import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import kToC from "./kToC";
export default function Forecast(props) {
  const { foreCast } = props;
  let [statusForeCast, setStatusForeCast] = useState(true);
  let [element, setForeCastElement] = useState();
  useEffect(() => {
    let foreCastElement = [];
    if (foreCast) {
      for (let i = 0; i <= 4; i++) {
        let hour = foreCast.list[i].dt_txt.split(" ")[1].split(":")[0];
        let icon = foreCast.list[i].weather[0].icon;
        let temp = foreCast.list[i].main.temp;
        temp = kToC(temp);
        foreCastElement.push(
          <div className="forecast-item" key={foreCast.list[i].dt}>
            <div className="forecast-hour">{hour}h</div>
            <div className="forecast-icon">
              <img
                style={{ width: "32px" }}
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather-icon"
              />
            </div>
            <div className="forecast-temp"> {temp}°C</div>
          </div>
        );
      }
      setForeCastElement(foreCastElement);
      setStatusForeCast(true);
    } else {
      setForeCastElement(<></>);
    }
  }, [foreCast]); // set default forecast when component render

  function handleClick(e) {
    let i, max, step, status;

    if (e.target.innerText === "Weekly ForeCast") {
      i = 3;
      max = 40;
      step = 8;
      status = false;
    } else {
      i = 0;
      max = 4;
      step = 1;
      status = true;
    }
    let foreCastElement = [];
    for (i; i <= max; i += step) {
      let hour;

      if (e.target.innerText === "Weekly ForeCast")
        hour =
          foreCast.list[i].dt_txt.split(" ")[0].split("-")[2] +
          "/" +
          foreCast.list[i].dt_txt.split(" ")[0].split("-")[1];
      else hour = foreCast.list[i].dt_txt.split(" ")[1].split(":")[0] + "h";
      let icon = foreCast.list[i].weather[0].icon;
      let temp = foreCast.list[i].main.temp;
      temp = kToC(temp);
      foreCastElement.push(
        <div className="forecast-item" key={foreCast.list[i].dt}>
          <div className="forecast-hour">{hour}</div>
          <div className="forecast-icon">
            <img
              style={{ width: "32px" }}
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
          <div className="forecast-temp"> {temp}°C</div>
        </div>
      );
    }
    setForeCastElement(foreCastElement);
    setStatusForeCast(status);
  } //  switch forecast mode
  return (
    <div className="forecast-wrap px-6 mt-48 ">
      <div className="forecast-top flex justify-between align-bottom pt-5">
        <div
          onClick={handleClick}
          className="forecast-hourly cursor-pointer"
          style={{
            color: statusForeCast ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          {" "}
          Hourly ForeCast
        </div>
        <div
          onClick={handleClick}
          style={{
            color: statusForeCast ? "rgba(255, 255, 255, 0.4)" : "#ffffff",
          }}
          className="forecast-weekly cursor-pointer"
        >
          Weekly ForeCast
        </div>
      </div>
      <div className="forecast-main flex justify-between pt-5 gap-x-2">
        {element}
      </div>
    </div>
  );
}
