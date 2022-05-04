import React from "react";
const Local = React.forwardRef((props, ref) => {
  const { getWeather, activeLocal, activeDropdown, getForeCast } = props;
  const listCity = ["Ho Chi Minh City", "Ha Noi", "Vinh", "Hue", "Da Nang"];

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
  function handelOnclick() {
    activeDropdown("local");
  }// active dropdown when click global element
  let localElement = listCity.map((item) => {
    return (
      <li
        onClick={() => {
          getDataWeather(item);
        }}
        key={item}
        className=" p-2 text-black hover:bg-sky-500 hover:text-white  "
      >
        {" "}
        {item}
      </li>
    );
  }); // list city element 

  return (
    <div
      ref={ref}
      className="
      relative
      text-white
      hover:text-blue-600
      
      cursor-pointer
    "
      onClick={handelOnclick}
    >
      Local
      <ul
        style={{ display: activeLocal ? "block " : "none", color: "#ffffff" }}
        className="absolute top-full z-10 w-40 rounded bg-white dropdown-menu "
      >
        {localElement}
      </ul>
    </div>
  );
});
export default Local;
