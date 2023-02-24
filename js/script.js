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
const weekDayImg = document.querySelector('.week-day-img');


fetch('https://api.open-meteo.com/v1/forecast?latitude=48.86&longitude=2.35&hourly=temperature_2m,cloudcover,rain&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // day.innerHTML = data.current_weather.time,

        // ------ left-bloc -----
        infosActuelles(data);

        // -------- right-bloc / precipitations, cloud and wind ------ 
        // Les données nuages étant dans hourly je récupère en utilisant l'heure comme index
        let cloudData = data.hourly.cloudcover[hour];
        console.log("🚀 ~ file: script.js:26 ~ cloudData:", cloudData)

        let precipitationsData = data.daily.precipitation_sum[0];
        let precipitationsTomorrow = data.daily.precipitation_sum[1];
        let windData = data.current_weather.windspeed;

        backgroundActuel(precipitationsData, cloudData)
        
        precipitations.innerHTML = precipitationsData + 'mm';
        wind.innerHTML = windData + 'km/h';

        weekDayTemp.innerHTML = `<img src="img/arrow-down.svg" alt="" />${data.daily.temperature_2m_min[1]}° <img src="img/arrow-up.svg" alt="" />${data.daily.temperature_2m_max[1]}°`;


        let sunset = (data.daily.sunset[0]).substr(11, 5);
        console.log(sunset);

        let sunrise = (data.daily.sunrise[1]).substr(11, 5)
        console.log(sunrise);

        nightHour(sunset, sunrise);

        let cloudsTomorrow = 0;
        let clouds = [];
        for (let i = 24; i < 48; i++) {
            // console.log(data.hourly.cloudcover[i])
            clouds.push(data.hourly.cloudcover[i]);
            // console.log("🚀 ~ file: script.js:53 ~ clouds:", clouds)
            cloudsTomorrow += data.hourly.cloudcover[i];
            // console.log("🚀 ~ file: script.js:55 ~ cloudsTomorrow:", cloudsTomorrow)
            // cloudsTomorrow = cloudsTomorrow/24;
            // console.log(1050/24);
            // console.log("🚀 ~ file: script.js:49 ~ cloudsTomorrow:", cloudsTomorrow)
        }
        cloudsTomorrow = cloudsTomorrow/24
        console.log("🚀 ~ file: script.js:60 ~ moyenne:", cloudsTomorrow)

        weatherIcon(precipitationsTomorrow, cloudsTomorrow);

        
    });




    function infosActuelles(data){
        lieu.innerText = data.timezone;
        temperatureActuelle.innerText = Math.round(data.current_weather.temperature) + '°C';

        temperatureMin.innerHTML = `<img src="img/arrow-down.svg" alt="" />${Math.round(data.daily.temperature_2m_min[0])}°`;
        temperatureMax.innerHTML = `<img src="img/arrow-up.svg" alt="" />${Math.round(data.daily.temperature_2m_max[0])}°`;
    }

    function backgroundActuel(precipitationsData, cloudData){
        if (precipitationsData > 0 && precipitationsData <= 5) {
            blocActuel.classList.add('background-little-rain');
        } else if (precipitationsData > 5) {
            blocActuel.classList.add('background-big-rain');
        } else if (cloudData > 30 && cloudData < 75){
            blocActuel.classList.add('background-sunny-clouds');
        } else if (cloudData >= 75){
        blocActuel.classList.add('background-grey-clouds');
        } else {
        blocActuel.classList.add('background-sun');
        }
    }

    function weatherIcon(precipitationsTomorrow, cloudsTomorrow){
        if (precipitationsTomorrow >= 5) {
            weekDayImg.innerHTML = `<img src="./img/rain.svg" alt="pluvieux" />`;
        } else if (cloudsTomorrow >= 30 && cloudsTomorrow < 65){
            weekDayImg.innerHTML = `<img src="./img/sun-cloud.svg" alt="nuage soleil" />`;
        } else if (cloudsTomorrow >= 75){
            weekDayImg.innerHTML = `<img src="./img/cloud.svg" alt="nuageux" />`;
        } else {
            weekDayImg.innerHTML = `<img src="./img/sun.svg" alt="ensoleillé" />`;
        }
    }

    console.log(document.querySelector('.week-day_temp'))


    let date = new Date();
console.log("🚀 ~ file: script.js:56 ~ date:", date)
const hour = date.getHours();
let minutes = date.getMinutes();

    function nightHour(sunset, sunrise){
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

