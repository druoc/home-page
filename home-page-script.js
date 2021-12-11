//using the Fetch api to return a random picture from the Unplash api
//which we then render as a background image and author to the page

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=space")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.querySelector('.author').textContent = `By: ${data.user.name}`
    });
    