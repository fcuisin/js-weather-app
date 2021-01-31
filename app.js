let token = config.MY_API_TOKEN;

function fetchApi(pos) {
  let crd = pos.coords;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${token}`;

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(`City : ${data.name}`);
    console.log(`Temperature : ${Math.round(data.main.temp - 273.15)}`);
  })
  .catch(function(error) {
    console.log(error);
  });

}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(fetchApi, error);
