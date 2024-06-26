const container = document.getElementById("elContainer");
const search = document.getElementById("busqueda");
const weatherBox = document.getElementById("tiempo");
const weatherDetails = document.getElementById("detalles");
const error404 = document.getElementById("no");

search.addEventListener('click', () =>{

    const APIKey = '1bdb4b7c3bd93ffd6fd155d0ac0d93d3';
    const city = document.getElementById("elInput").value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
        
        if(json.cod === '404'){
            container.style.height = '404px'
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.getElementById("image");
        const temperature = document.getElementById("temperatura");
        const description = document.getElementById("descripcion");
        const humidity = document.getElementById("spanHum");
        const wind = document.getElementById("spanWin");

        switch (json.weather[0].main){
            case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});