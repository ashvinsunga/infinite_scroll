const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageloaded = 0;
let totalImages = 0;
let imageArray = [];

// Unsplash API
const count = 10;
const apiKey = 'bfqI5pyyaeRPEjAbcLsudvKSyWnkwFv3EjB4mE5PyL4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
    imageloaded++;
    if (imageloaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 20;
    }
}


function printLoaded(){
    loadCount ++;
    console.log(loadCount)
}

// Function helper for setting DOM element attributes
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Spawn elements for Links & Photos, Add to DOM
function displayImages() {
    totalImages = imageArray.length;
    console.log('total images', totalImages);
    imageArray.forEach((image) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: image.links.html,
            target: '_blank',
        });

        //Create <img> for image
        const img = document.createElement('img');
        setAttributes(img, {
            src: image.urls.regular,
            alt: image.alt_description,
            title: image.alt_description,
        });
        // Event Listener, check when every image is finished loading
        img.addEventListener('load',imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    }); 
}

// Fetch images from Unsplash API
async function getImages() {
    try{
        const response = await fetch(apiURL);
        imageArray = await response.json();
        displayImages();
    } catch (error){
        //Catch error here
    }
}

// Check to see if scroll is near to bottom of the page. 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && ready){
    ready = false;
    loader.hidden = false;
    getImages();
    imageloaded = 0;
    }
})
// On load
getImages();