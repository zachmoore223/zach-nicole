import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon.js";

export default function Forecast({latitude, longitude}) {
  const [activeCity, setActiveCity] = useState("Columbus");
  const [temperatureHigh, setTemperatureHigh] = useState("");
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
          console.log("FORECAST:");
          console.log(response);

          setTemperatureHigh(response.daily.apparent_temperature_max[0]);
          console.log("Forecast:" + response.daily.apparent_temperature_max[0]);

          setChanceOfRain(
            response.daily.precipitation_probability_max[0]
          );
          console.log("Forecast" + response.daily.precipitation_probability_max[0]);
          
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
    <div>
      <div className="activeCity">
         <p> Day 1 </p>
        </div>
        <div className="iconAndTemp">
          <WeatherIcon cloudCoverage={cloudCoverage} /> &nbsp;&nbsp;
          <p>{temperatureHigh} &#8457;</p>
        </div>
        <div className="chanceOfRain">
          <p>Chance of Rain:<strong> {chanceOfRain} %</strong></p>
        </div>
    </div>
  </div>
  );} else {
    return (
    <div className="forecast">
    <button className="forecastButton" onClick={()=> {setShowForecast(true)}}>Show Forecast</button>
    </div>
 ); }

}
