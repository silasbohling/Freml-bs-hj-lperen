import React from 'react';

const apiKey = "1b3c34db593d57406c5376dd5235d4c1";

const Api = {
  servername: "http://api.openweathermap.org/data/2.5",
  currentCityWeather: (cityId) => {
    const path = "/forecast?id=" + cityId + "&units=metric";
    return fetchFromServer("GET", path);
  }
}

const fetchFromServer = async (method, path, data) => {
  const url = Api.servername + path + "&APPID=" + apiKey;
	console.log({method, url, data});

  return fetch( url, {
      method: method,
  }).then( res => {
    if (!res.ok){
      throw Error("Network Error: " + res.statusText);
    }
    return res.json();
  });
}

export default Api;
