//using the Fetch api to return a random picture from the Unplash api according to the drop down selector
//which we then render on each selection as a background image, and author of the picture to the 'author' p-tag.

const theme = document.querySelector('#theme-select'); //setting the drop down menu as a variable

//formats our returned Bitcoin cost into GBP, when we pass the value into it as a parameter in the fetch request further down
const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2
});

//setting a default random background from the unsplash API until the user changes it
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=random')
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.querySelector('.author').textContent = `Photo by: ${data.user.name}`
    });

//changes background according to user selection
theme.addEventListener('change', () => {
    fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${theme.value}`)
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.querySelector('.author').textContent = `Photo by: ${data.user.name}`
    });
})
    
//again using the fetch api to grab the price of bitcoin from the CoinGecko api
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then(res => res.json())
    .then( data => {
        document.querySelector('.crypto').textContent = `Bitcoin: ${currencyFormatter.format(data.market_data.current_price.gbp)}`
        document.querySelector('.crypto-icon').innerHTML = `
        <img src="${data.image.thumb}"/>`
    })
    .catch(error => console.log('Whoops, something went wrong...'));

//grabbing the current time, and rendering it to the page
const renderTime = () => {
    const today = new Date();
    document.querySelector('.time').textContent = today.toLocaleTimeString("en-uk", {timeStyle: "short"});
}

setInterval(renderTime, 1000);

//rendering the current location weather to the page using the OpenWeather API
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.querySelector('.weather').innerHTML = `
            <img src=${iconUrl} />
            <p class="temperature">${data.main.temp}°C</p>
            <p class="city">${data.name}</p>`;
        })
        .catch(err => console.error(err));
});


