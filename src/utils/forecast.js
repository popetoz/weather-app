const { default: axios } = require("axios");
const weatherstackKey = process.env.WEATHERSTACK_KEY;

const forecast = async (long, lat) => {
  const url = encodeURI(
    `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${long},${lat}`
  );
  try {
    const { data: res } = await axios.get(url);

    const info = {
      forecast: `The weather in ${res.location.name} ${res.location.country} ${res.location.region} description is: ${res.current.weather_descriptions[0]}. Now It's: ${res.current.temperature}C. and It feels like: ${res.current.feelslike}C`,
      long: res.location.lon,
      lat: res.location.lat,
    };

    return info;
  } catch (e) {
    if (e.message === "getaddrinfo ENOTFOUND api.weatherstack.com") {
      throw new Error(
        "Unable to connect to the Geocode service! make sure you are connected to the internet!"
      );
    }
    throw new Error("please provide right coordinates");
  }
};

module.exports = forecast;
