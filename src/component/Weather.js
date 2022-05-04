import React from "react";
import kToC from "./kToC";
export default function Weather(props) {
  const { listWeather } = props;
  let weatherElement;
  if (listWeather.length === 0) weatherElement = <></>;
  else
    weatherElement = listWeather.map((item, index) => {
      return (
        <div className="weather-main flex flex-col items-center pt-8 " key={index}>
          <h1 className="weather-place text-4xl ">{item.name}</h1>
          <div className="weather-temp-main my-3">{kToC(item.main.temp)}°C</div>
          <div className="weather-description">
            {item.weather[0].description}
          </div>
          <div className="weather-temp flex justify-around">
            <div className="weather-temp-max mr-3">
              H:{kToC(item.main.temp_max)}°C
            </div>
            <div className="weather-temp-min">
              L:{kToC(item.main.temp_min)}°C
            </div>
          </div>
        </div>   
      );
    });
  return <div className="weather">{weatherElement}</div>;
}
