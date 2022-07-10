const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let picsLoaded = 0;
let totalPics = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "J5lzh6qG_3gBZhlcvuU-UDk-duXJFmGrrl_aYDwWNJM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check idf pic is loaded
function picLoaded() {
    picsLoaded++;

    if (picsLoaded === totalPics) {
        ready = true;
        loader.hidden = true;

    }
    
}

// Helper functon to set attributes\

function setAttributes(element, attributes) {

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// Display photos and put into DOM
function displayPhotos() {
    picsLoaded = 0;
    totalPics = photosArray.length;
    // get info in photoArray and populate
    photosArray.forEach((photo) => {
        // createthe <a> element to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href:photo.links.html,
            target: '_blank',
        });

        // image to be be the thing inside the link

        const pic = document.createElement('img');
        setAttributes(pic, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });

        // Event listener to chech hen pic are loaded
        pic.addEventListener('load', picLoaded);

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

// Listener to check for scrolled screen and next to the bottom
window.addEventListener('scroll' ,() => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
    
});



// On load
getPhotos();