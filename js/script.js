const day = document.getElementById('day');
const lieu = document.getElementById('localisation');
const temperatureActuelle = document.getElementById('temperature');
const temperatureMin = document.getElementById('temperature-min');
const temperatureMax = document.getElementById('temperature-max');
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

        weekDayTemp.innerHTML = data.daily.temperature_2m_min[1] +  '°C <br> ' + data.daily.temperature_2m_max[1] + '°C';


        let sunset = (data.daily.sunset[0]).substr(11, 5);
        console.log(sunset);

        let sunrise = (data.daily.sunrise[1]).substr(11, 5)
        console.log(sunrise);

        nightHour(sunset, sunrise);

        
    });

    function infosActuelles(data){
        lieu.innerText = data.timezone;
        temperatureActuelle.innerText = Math.round(data.current_weather.temperature) + '°C';

        temperatureMin.innerHTML = `<img src="img/arrow-down.svg" alt="" />${Math.round(data.daily.temperature_2m_min[0])}°`;
        temperatureMax.innerHTML = `<img src="img/arrow-up.svg" alt="" />${Math.round(data.daily.temperature_2m_max[0])}°`;
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

    function nightHour(sunset, sunrise){
        let date = new Date();
    console.log("🚀 ~ file: script.js:56 ~ date:", date)
    const hour = date.getHours();
    let minutes = date.getMinutes();
    (minutes >= 0 && minutes < 10) ? minutes = `0${minutes}` : minutes;
    let heureActuelle = `${hour}:${minutes}`;
    console.log("🚀 ~ file: script.js:46 ~ heureActuelle:", heureActuelle);

    if((heureActuelle >= sunset && heureActuelle <= '23:59') || (heureActuelle >= '00:00' && heureActuelle <= sunrise)){
        // console.log('bite');
        blocActuel.classList.add('background-night');
    } else {
        // console.log('vagin');
    }
    }

