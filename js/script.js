document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityname = document.querySelector('#cityname').value;

    if (!cityname){
        document.querySelector("#weather").classList.remove('show');
        return showalert(`
            Você precisa digitar uma cidade!
            `);    
    }

    console.log(cityname);

    const apiKey = 'f11489fc51d845d7e9e3898feb61b014';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityname)}&appid=${apiKey}&units=metric&lang=pt_br`;


    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            temp_max: json.main.temp_max,
            temp_min: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showalert(`

            Juro que tentei, mas não achei nenhuma "${cityname}"!
            
            <img src="./images/cat.webp" alt="">
            `)
    }
});

function showInfo(json){
    showalert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}` //cidade
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1).replace('.',',')} <sup>c°</sup>` //temp atual 
    document.querySelector('.temp-max').innerHTML = `${json.temp_max.toFixed(1).replace('.',',')}` //temp max
    document.querySelector('.temp-min').innerHTML = `${json.temp_min.toFixed(1).replace('.',',')}` //temp min
    document.querySelector('#temp-description').innerHTML = `${json.description}` //descrição
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`) //imagem
    document.querySelector('.humidade').innerHTML = `${json.humidity}%`
    document.querySelector('.wind').innerHTML = `${json.windSpeed} KM/h`

}

function showalert(msg){
    document.querySelector('#alert').innerHTML = msg;
}

