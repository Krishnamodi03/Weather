
const container = document.querySelector('.container');
const search =  document.querySelector('.search-box button');
const weatherBOX = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',() => {
    const APIKey = 'ceabe8f2351a573159cfa0548bda1ce9';
    const city = document.querySelector('.search-box input').value;
    if(city =='')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'ceabe8f2351a573159cfa0548bda1ce9'}
    `).then(response =>response.json()).then(json => {
        if(json.cod =='404'){
            weatherBOX.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        weatherBOX.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');


        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rainy.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/clouds.png';
                break;
            case 'Mist':
                image.src = 'images/mist.png';
                break;
            default:    
                image.src = 'images/clouds.png';
            
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseFloat(json.wind.speed)}km/h`;
    });
});