import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon.js";

export default function Forecast() {
  const [activeCity, setActiveCity] = useState("Columbus");
  const [latitude, setLatitude] = useState("39.96");
  const [longitude, setLongitude] = useState("-83.0");
  const [temperature, setTemperature] = useState("");
  const [chanceOfRain, setChanceOfRain] = useState("");
  const [cloudCoverage, setCloudCoverage] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    function changeCity() {
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          latitude +
          "&longitude=" +
          longitude +
          "&hourly=temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,weathercode,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&timezone=auto"
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setTemperature(response.current_weather.temperature);
          setChanceOfRain(
            response.hourly.precipitation_probability[
              response.hourly.precipitation_probability.length - 1
            ]
          );
          setCloudCoverage(
            response.hourly.cloudcover[response.hourly.cloudcover.length - 1]
          );

        });
    }
    changeCity();
  }, [activeCity]);

  if(showForecast==true){
  return (
  <div>
    <div className="forecast">
    <button className="forecastButton" onClick={()=> {setShowForecast(false)}}>Hide Forecast</button>
    </div>
    <div className="forecastSection">
      <p> forecast here</p>
    </div>
  </div>
  );} else {
    return (
    <div className="forecast">
    <button className="forecastButton" onClick={()=> {setShowForecast(true)}}>Show Forecast</button>
    </div>
 ); }

}
