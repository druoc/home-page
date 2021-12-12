//using the Fetch api to return a random picture from the Unplash api
//which we then render on each load/refresh as a background image, and author of the picture to the 'author' p-tag.

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=space")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.querySelector('.author').textContent = `By: ${data.user.name}`
    });
    
//again using the fetch api to grab the price of bitcoin from the CoinGeck api
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then(res => res.json())
    .then( data => {
        document.querySelector('.crypto').textContent = `Bitcoin: £${data.market_data.current_price.gbp}`
    })
    .catch(error => console.log('Whoops, something went wrong...'))