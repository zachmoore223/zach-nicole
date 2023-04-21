import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon.js";

export default function Weather2() {
  const [activeCity, setActiveCity] = useState("Columbus");
  const [latitude, setLatitude] = useState("39.96");
  const [longitude, setLongitude] = useState("-83.0");
  const [temperature, setTemperature] = useState("");
  const [chanceOfRain, setChanceOfRain] = useState("");
  const [cloudCoverage, setCloudCoverage] = useState("");
  useEffect(() => {
    function changeCity() {
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          latitude +
          "&longitude=" +
          longitude +
          "&hourly=temperature_2m,precipitation_probability,rain,showers,snowfall,cloudcover&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&forecast_days=3&timezone=auto"
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
  return (
    <div>
      <div className="cityButtons">
        <button
          className={`cityButton ${activeCity === "Columbus" ? "active" : ""}`}
          id="Columbus"
          onClick={() => {
            setActiveCity("Columbus");
            setLatitude("39.96");
            setLongitude("-83.0");
          }}
        >
          Columbus
        </button>
        <br />
        <br />
        <button
          className={`cityButton ${activeCity === "Shelby" ? "active" : ""}`}
          id="Shelby"
          onClick={() => {
            setActiveCity("Shelby");
            setLatitude("40.88");
            setLongitude("-82.66");
          }}
        >
          Shelby
        </button>
        <br />
        <br />
        <button
          className={`cityButton ${activeCity === "Tampa" ? "active" : ""}`}
          id="Tampa"
          onClick={() => {
            setActiveCity("Tampa");
            setLatitude("27.95");
            setLongitude("-82.46");
          }}
        >
          Tampa
        </button>
      </div>
      <br /> <br />
      <div className="activeCity">
        <p> {activeCity} </p>
      </div>
      <div className="iconAndTemp">
        <WeatherIcon cloudCoverage={cloudCoverage} /> &nbsp;&nbsp;
        <p>{temperature} &#8457;</p>
      </div>
      <div className="chanceOfRain">
        <p>{chanceOfRain}% chance of rain today.</p>
      </div>
    </div>
  );
}
