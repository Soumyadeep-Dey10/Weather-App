import React, { useState } from 'react';
import search_icon from  '../assets/search.png';
import clear_icon from  '../assets/clear.png';
import cloud_icon from  '../assets/cloud.png';
import drizzle_icon from  '../assets/drizzle.png';
import humidity_icon from  '../assets/humidity.png';
import rain_icon from  '../assets/rain.png';
import snow_icon from  '../assets/snow.png';
import wind_icon from  '../assets/wind.png';

import './WeatherApp.css';

const WeatherApp =() => {
    let api_key="bea00cd71f42d0d9580303023a1b9787";

    const [wicon, setWicon] = useState(cloud_icon); // Define wicon state variable

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");

        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temparature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " % ";
        wind[0].innerHTML = data.wind.speed + " km/h";

        temparature[0].innerHTML = data.main.temp + "°C ";
        location[0].innerHTML = data.name;

        // Update wicon state based on weather condition
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "o1n") {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "o2n") {
            setWicon(cloud_icon);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "o3n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "o4n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "o9n") {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "3n") {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type='text' className='cityInput' placeholder='Enter Search'></input>
                <div className="search_icon" onClick={search}>
                    <img src={search_icon} alt="search icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="cloud icon"/>
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">

                <div className="element">
                    <img src={humidity_icon} alt="humidity icon" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">60%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind icon" className='icon' />
                    <div className="data">
                        <div className="wind-rate">18km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
