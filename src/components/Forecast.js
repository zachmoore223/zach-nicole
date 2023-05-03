import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon.js";

export default function Forecast({latitude, longitude}) {
  const [activeCity, setActiveCity] = useState("Columbus");
  const [temperatureHigh, setTemperatureHigh] = useState("");
  const [temperatureLow, setTemperatureLow] = useState("");
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
          "&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&timezone=America%2FNew_York"
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);

          setTemperatureHigh(response.daily.apparent_temperature_max);
          console.log("Forecase High Temp: " + response.daily.apparent_temperature_max);

          setTemperatureLow(response.daily.apparent_temperature_max);
          console.log("Forecase Low Temp: " + response.daily.apparent_temperature_min);

          setChanceOfRain(
            response.hourly.precipitation_probability[0]);
            console.log("Forecast Precip: " + response.hourly.precipitation_probability);

          setCloudCoverage(
            response.hourly.cloudcover[0]
          );
          console.log("Forecast: " + response.hourly.cloudcover[0]);

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
    <ForecastTable temperatureHigh={temperatureHigh} temperatureLow={temperatureLow} cloudCoverage={cloudCoverage} chanceOfRain={chanceOfRain}/>
  </div>
  );} else {
    return (
    <div className="forecast">
    <button className="forecastButton" onClick={()=> {setShowForecast(true)}}>Show Forecast</button>
    </div>
 ); }

}

function ForecastTable({temperatureHigh, temperatureLow, cloudCoverage, chanceOfRain}) {
  const today = new Date();
  const daysArray = [];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    let day = nextDay.getDay();
    daysArray.push(day);
    console.log(daysArray[i]);
  }

  return (
    <div>
      <div className="daysOfTheWeek">
        <p><strong>{daysOfWeek[daysArray[1]]}</strong></p>
        <p><strong>{daysOfWeek[daysArray[2]]}</strong></p>
        <p><strong>{daysOfWeek[daysArray[3]]}</strong></p>
        <p><strong>{daysOfWeek[daysArray[4]]}</strong></p>
        <p><strong>{daysOfWeek[daysArray[5]]}</strong></p>
        <p><strong>{daysOfWeek[daysArray[6]]}</strong></p>
        <p><strong>{daysOfWeek[daysArray[7]]}</strong></p>
        <p><strong>{daysOfWeek[daysArray[0]]}</strong></p>
      </div>
      <div className="forecastHigh">
        <p>High: <strong> {temperatureHigh[0]}</strong></p>
        <p>High: <strong> {temperatureHigh[1]}</strong></p>
        <p>High: <strong> {temperatureHigh[2]}</strong></p>
        <p>High: <strong> {temperatureHigh[3]}</strong></p>
        <p>High: <strong> {temperatureHigh[4]}</strong></p>
        <p>High: <strong> {temperatureHigh[5]}</strong></p>
        <p>High: <strong> {temperatureHigh[6]}</strong></p>  
      </div>
      <div className="forecastLow">
        <p>Low: <strong> {temperatureLow[0]}</strong></p>
        <p>Low: <strong> {temperatureLow[1]}</strong></p>
        <p>Low: <strong> {temperatureLow[2]}</strong></p>
        <p>Low: <strong> {temperatureLow[3]}</strong></p>
        <p>Low: <strong> {temperatureLow[4]}</strong></p>
        <p>Low: <strong> {temperatureLow[5]}</strong></p>
        <p>Low: <strong> {temperatureLow[6]}</strong></p>  
      </div>
    </div>
  );
}

