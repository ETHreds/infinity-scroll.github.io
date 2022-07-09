const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "J5lzh6qG_3gBZhlcvuU-UDk-duXJFmGrrl_aYDwWNJM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Display photos and put into DOM
function displayPhotos() {
    // get info in photoArray and populate
    photosArray.forEach((photo) => {
        // createthe <a> element to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // image to be be the thing inside the link

        const pic = document.createElement('img');
        pic.setAttribute('src', photo.urls.regular);
        pic.setAttribute('alt', photo.alt_description);
        pic.setAttribute('title', photo.alt_description);

        // poulate to DOM
        item.appendChild(pic);
        imageContainer.appendChild(item);


    });
}

// Get photos from unsplash

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        
        displayPhotos();
    
    } catch (error) {
        // Show error
    }

}

// On load
getPhotos();