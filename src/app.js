const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const getMapUrl = require("./utils/map");

// make an express app and define the port we use
const app = express();
const port = process.env.PORT || 3000;

// Define paths in our app
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

// setup static directory to serve
app.use(express.static(publicDir));

// Setup hbs engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Abanoub",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    msg: "All you need to do is to type a location hit the search icon and get the forecast",
  });
});

app.get("/weather", async (req, res) => {
  const longitude = req.query.longitude;
  const latitude = req.query.latitude;
  const location = req.query.location;
  try {
    // check for bad request in the case of no latitude and longitude
    if (!location && (!latitude || !longitude)) {
      return res.status(400).send({ error: "Bad Request" });
    }
    const data = location
      ? await forecast(location)
      : await forecast(latitude, longitude);

    const url = await getMapUrl(data.long, data.lat);
    res.send({ forecast: data.forecast, ImageUrl: url });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get("/help/*", (req, res) => {
  res.render("not-found", {
    title: "Documentation Not Found!",
  });
});

app.get("*", (req, res) => {
  res.render("not-found", {
    title: "Page Not Found!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
