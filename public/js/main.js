const $menuBtn = document.querySelector("header i");
const $linksMenu = document.querySelector("header .links");
const $locationBtn = document.querySelector("#locationIcon");
const $forecastDiv = document.querySelector("#forecast");
const $closeBtn = document.querySelector("#close");
const $form = document.querySelector("#form");

// menu btn control
$menuBtn.addEventListener("click", () => {
  $linksMenu.classList.toggle("show");
});

// close btn control
$closeBtn.addEventListener("click", () => {
  setTimeout(() => {
    $forecastDiv.classList.toggle("hide");
  }, 100);
});

// when clicking the location btn
let coords = { longitude: "", latitude: "" };
$locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      coords.latitude = pos.coords.latitude;
      coords.longitude = pos.coords.longitude;

      // making request to the server to get the forecast and the map to display on the screen
      const data = await (
        await fetch(
          `/weather?longitude=${coords.longitude}&latitude=${coords.latitude}`
        )
      ).json();

      // call display the forecast function
      displayForecast(data);
    });
  } else {
    alert("GeoLocation service not working!");
  }
});

// when submit the form
$form.addEventListener("submit", async (e) => {
  // prevent Default
  e.preventDefault();

  // get location
  const location = $form.children[0].children[0].value;

  // making request to the server to get the forecast and the map to display on the screen
  const data = await (await fetch(`/weather?location=${location}`)).json();

  // call display the forecast function
  displayForecast(data);
});

// display the forecast funcyion
const displayForecast = ({ forecast, ImageUrl }) => {
  console.log(forecast, ImageUrl);

  // show the forecast Div
  $forecastDiv.classList.toggle("hide");

  // insert in the paragraph
  $forecastDiv.firstElementChild.firstElementChild.textContent = forecast;

  // insert the url for image
  $forecastDiv.firstElementChild.children[1].setAttribute("src", ImageUrl.url);
};
