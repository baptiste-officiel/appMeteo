const day = document.getElementById('day');
const lieu = document.getElementById('localisation');
const temperatureActuelle = document.getElementById('temperature');
let blocActuel = document.querySelector('.left-bloc');
console.log("🚀 ~ file: script.js:5 ~ blocActuel", blocActuel)

const precipitations = document.getElementById('precipitations');
const wind = document.getElementById('wind');

const weekDayTemp = document.querySelector('.week-day_temp');


fetch('https://api.open-meteo.com/v1/forecast?latitude=48.86&longitude=2.35&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // day.innerHTML = data.current_weather.time,

        // ------ left-bloc -----
        lieu.innerHTML = data.timezone;
        temperatureActuelle.innerHTML = data.current_weather.temperature + '°C';

        // -------- right-bloc / precipitations and wind ------ 
        let precipitationsData = data.daily.precipitation_sum[0];
        precipitations.innerHTML = 'Précipitations : &nbsp&nbsp' + precipitationsData + 'mm';
        if (precipitationsData > 0 && precipitationsData <= 5) {
            blocActuel.classList.add('background-little-rain');
        } else if (precipitationsData > 5) {
            blocActuel.classList.add('background-big-rain');
        } else {
            blocActuel.classList.add('background-sun');
        }

        wind.innerHTML = 'Vent : &nbsp&nbsp' + data.current_weather.windspeed + 'km/h';

        weekDayTemp.innerHTML = data.daily.temperature_2m_min[0] +  '°C <br> ' + data.daily.temperature_2m_max[0] + '°C';
    });

    console.log(document.querySelector('.week-day_temp'))
