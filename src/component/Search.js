import React from "react";
import { useRef } from "react";
async function getData(city, getWeather, getForeCast) {
  try {
    const dataJson = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=825ef309eff266f2850c2ce07228190e`
    );
    const data = await dataJson.json();
    if (data.cod === "404") return;
    getWeather([data]);
  } catch (error) {
    console.log(error);
  }
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=825ef309eff266f2850c2ce07228190e`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") return;
      getForeCast(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
const Search = (props) => {
  const { getWeather, getForeCast } = props;

  let inputRef = useRef(null);
  let handelSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      getData([]);
    } else {
      let keySearch = inputRef.current.value;
      keySearch = keySearch.replace(/\s/g, "").toLowerCase();
      getData(keySearch, getWeather, getForeCast);
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className=" input-group relative flex flex-wrap items-stretch "
    >
      <div className="flex md:order-2">
        <div className="hidden relative mr-3 md:mr-0 md:block ">
          <div className="flex  px-2 absolute inset-y-0 left-0 items-center pr-3 pointer-events-none ">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            onClick={handelSubmit}
            ref={inputRef}
            type="text"
            id="email-address-icon"
            className="block h-9 p-3 w-48  cursor-pointer text-gray-900 bg-gray-50 rounded-md border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
      </div>
    </form>
  );
};

export default Search;
