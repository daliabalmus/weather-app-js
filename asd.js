
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) => {

	const cityDets = data.cityDets;
	const weather = data.weather;

	details.innerHTML = `
		<h5 class="my-3">${cityDets.EnglishName}</h5>
		<div class="my-3">${weather.WeatherText}</div>
		<div class="display-4 my-4">
			<span>${weather.Temperature.Metric.Value}</span>
			<span>&deg;C</span>
		</div>
	`;

};

const updateCity = async (city) => {

	// console.log(city);
	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets.Key);

	return { cityDets: cityDets,
		weather: weather };

};

cityForm.addEventListener('submit', (e) => {

	// prevent default
	e.preventDefault();

	// get city value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	// update the ui with the new city
	updateCity(city)
		.then(data => updateUI(data))
		.catch(err => console.log(err));
});