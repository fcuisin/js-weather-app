let token = "2c1b5d784cce8f292854b502ac2bacee";
;

function pushWeatherData(data) {

  let now = new Date();
  let dayName = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );

  let monthName = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  let humidity = document.querySelector(".card_info_humidity");
  let wind = document.querySelector(".card_info_wind");
  let temp = document.querySelector(".temperature_value");
  let city = document.querySelector(".card_city");
  let img = document.querySelector(".card_img");
  let date = document.querySelector(".card_date");

  humidity.innerHTML = `
        <img src="images/humidity.svg" alt="">
        <p>${data.main.humidity}%</p>
      `;

  wind.innerHTML = `
        <img src="images/wind.svg" alt="">
        <p>${Math.round((data.wind.speed) * 3.6)}km/h</p>
      `;

  date.innerHTML = `<p>${dayName[now.getDay()]} ${now.getDate()} ${monthName[now.getMonth()]}</p>`;

  temp.innerHTML = `${Math.round(data.main.temp - 273.15)}`;

  city.innerHTML = `
        <img src="images/pin.svg" alt="">
        <p>${data.name}</p>
      `;

  img.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      `;

  document.querySelector(".card").classList.remove("hidecard");
}


async function fetchApi(pos) {

  let crd = pos.coords;
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${token}`;

  try {

    const response = await fetch(url);
    return pushWeatherData(await response.json());

  } catch (error) {

    console.log('Fetch error: ', error);

  }

}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(fetchApi, error);
