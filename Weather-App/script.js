
const container = document.getElementById("container");


window.onload = function () {
	document.querySelector('.input-search').value = '';
}

// API
const api_details = {
	url: "http://api.openweathermap.org/data/2.5/",
	api_key: "60bbd59ec7556e88c0f6b5a2080aebaa"
}

// search city on keypress
const input = document.querySelector('.input-search');
input.addEventListener('keypress', showData)



function showData(e) {
	if (e.keyCode === 13) {
		showResults(input.value);

	}

}

// GET API RESULTS

async function showResults(value) {
	const data = await fetch(`${api_details.url}weather?q=${value}&units=metric&APPID=${api_details.api_key}`)
	const fdata = await data.json();
	console.log(fdata)
	if (fdata.message === "city not found") {
		const ele = document.createElement('h1')
		ele.className = "heady"
		ele.appendChild(document.createTextNode("City Not Found"))

	}

	else {
		displayData(fdata);
	}
}

// DISPLAY DATA IN CONTAINER

function displayData(data) {
	const location_city = document.querySelector('.city');
	location_city.innerText = `${data.name},${data.sys.country}`
	container.style.backgroundColor = "#2c9c91";
	container.style.margin = " 20px 400px";
	container.style.borderRadius = "5px";
	let time = new Date();
	const date = document.querySelector('.l-date');

	let months_year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let day = days_week[time.getDay()];
	let pdate = time.getDate();
	let month = months_year[time.getMonth()];
	let year = time.getFullYear();

	date.innerText = `${day} ${pdate} ${month} ${year}`

	const degrees = document.querySelector('.degrees');
	degrees.innerHTML = `${Math.round(data.main.temp)}
			<span>&#730C</span>
		`

	const type = document.querySelector('.d-type');
	type.innerText = `${data.weather[0].main}`

	const lowHigh = document.querySelector('.d-range');
	lowHigh.innerHTML = `${Math.round(data.main.temp_min)}<span>&#730C</span>/${Math.round(data.main.temp_max)}<span>&#730C</span>`
}

// RESET BUTTON
function clearResult() {
	document.getElementById("container").textContent = ' ';
	container.style.backgroundColor = "#abe2e2";
	document.querySelector('.input-search').value = '';

}
