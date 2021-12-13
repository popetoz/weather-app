const { default: axios } = require("axios");
const mapboxKey = process.env.MAPBOX_KEY;

const getMapUrl = async (long, lat) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${long},${lat},8.12,0/600x400?access_token=${mapboxKey}`
      )
    );

    if (res.message === "Not Found") {
      throw new Error(
        "Cannot get this location please make sure to spell it correctly!"
      );
    }

    return { url: res.config.url };
  } catch (e) {
    if (e.message === "getaddrinfo ENOTFOUND api.mapbox.com") {
      throw new Error(
        "Unable to connect to the location service! make sure you are connected to the internet!"
      );
    }

    throw new Error(e.message);
  }
};

module.exports = getMapUrl;
