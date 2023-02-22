const day = document.getElementById('day');
const lieu = document.getElementById('localisation');
const temperatureActuelle = document.getElementById('temperature');
let blocActuel = document.querySelector('.left-bloc');
console.log("🚀 ~ file: script.js:5 ~ blocActuel", blocActuel)

const precipitations = document.getElementById('precipitations');
const wind = document.getElementById('wind');

const weekDayTemp = document.querySelector('.week-day_temp');


fetch('https://api.open-meteo.com/v1/forecast?latitude=48.86&longitude=2.35&hourly=temperature_2m,rain&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // day.innerHTML = data.current_weather.time,

        // ------ left-bloc -----
        infosActuelles(data);

        // -------- right-bloc / precipitations and wind ------ 
        let precipitationsData = data.daily.precipitation_sum[0];
        let windData = data.current_weather.windspeed;
        
        backgroundActuel(precipitationsData)
        
        precipitations.innerHTML = '<img src="img/water.svg" alt="Précipitations" />  &nbsp&nbsp' + precipitationsData + 'mm';
        wind.innerHTML = '<img src="img/wind.svg" alt="Précipitations" />  &nbsp&nbsp' + windData + 'km/h';

        weekDayTemp.innerHTML = data.daily.temperature_2m_min[0] +  '°C <br> ' + data.daily.temperature_2m_max[0] + '°C';
    });

    function infosActuelles(data){
        lieu.innerText = data.timezone;
        temperatureActuelle.innerText = data.current_weather.temperature + '°C';
    }

    function backgroundActuel(precipitationsData){
        if (precipitationsData > 0 && precipitationsData <= 5) {
            blocActuel.classList.add('background-little-rain');
        } else if (precipitationsData > 5) {
            blocActuel.classList.add('background-big-rain');
        } else {
            blocActuel.classList.add('background-sun');
        }
    }

    console.log(document.querySelector('.week-day_temp'))

    let date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    let heureActuelle = `${hour}:${minutes}`;
    console.log("🚀 ~ file: script.js:44 ~ minutes:", minutes)
    console.log("🚀 ~ file: script.js:46 ~ heureActuelle:", heureActuelle)
    console.log("🚀 ~ file: script.js:43 ~ hour:", hour)
    console.log("🚀 ~ file: script.js:42 ~ date:", date)
