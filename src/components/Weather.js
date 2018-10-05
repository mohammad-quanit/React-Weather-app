import React from "react";

const Weather = props => {
  const {
    temprature,
    tempFahrenheit,
    city,
    country,
    humidity,
    description,
    error
  } = props;
  return (
    <div className="weather__info">
      {city &&
        country && (
          <p className="weather__key">
            Location:&nbsp;
            <span className="weather__value">
              {city}, {country}
            </span>
          </p>
        )}

      {temprature && (
        <p className="weather__key">
          Temprature: &nbsp;<span className="weather__value">
            {temprature}°C, {tempFahrenheit}°F
          </span>
        </p>
      )}
      {humidity && (
        <p className="weather__key">
          Humidity: &nbsp;<span className="weather__value">{humidity}</span>
        </p>
      )}
      {description && (
        <p className="weather__key">
          Decription: &nbsp;<span className="weather__value">
            {description}
          </span>
        </p>
      )}
      {error && (
        <p className="weather__error">
          Please Provide Correct City and Country
        </p>
      )}
    </div>
  );
};

export default Weather;
