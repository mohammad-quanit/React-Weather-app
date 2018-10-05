import React, { Component } from "react";

import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "5ba42a9df55fac41a9f30fd42d07bd46";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export default class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temprature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  //getting weather from url
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (!city || !country) {
      this.setState({
        temprature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please Provide Both City and Country!"
      });
    } else {
      const api_call = await fetch(
        `${BASE_URL}?q=${city},${country}&appid=${API_KEY}`
      );
      const data = await api_call.json();
      if (data.cod !== "404") {
        this.setState({
          temprature: Math.round(data.main.temp - 273),
          tempFahrenheit: Math.round((data.main.temp - 273) * 1.8 + 32),
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
      } else {
        this.setState({
          temprature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please Provide Correct City!"
        });
      }
    }
  };

  render() {
    const {
      temprature,
      tempFahrenheit,
      city,
      country,
      humidity,
      description,
      error
    } = this.state;

    return (
      <div className="wrapper">
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4 title-container">
                <Title />
              </div>
              <div className="col-sm-8 form-container">
                <Form getWeather={this.getWeather} />
                <Weather
                  temprature={temprature}
                  tempFahrenheit={tempFahrenheit}
                  city={city}
                  country={country}
                  humidity={humidity}
                  description={description}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
