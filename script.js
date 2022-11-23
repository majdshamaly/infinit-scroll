// Html Elements
const imagesContainer = document.getElementById("images-container");
let numOfLoadedImages = 0;
const count = 10;
let loadAgain = false;
// Use Data From Unsplash API
const useData = (photosArray) => {
  photosArray.forEach((photoOpject) => {
    const a = document.createElement("a");
    a.setAttribute("href", photoOpject.links.html);
    a.setAttribute("target", "_blank");
    // creat img element
    const img = document.createElement("img");
    img.setAttribute("src", photoOpject.urls.regular);
    img.setAttribute("desicription", photoOpject.alt_description);

    img.addEventListener("load", () => {
      numOfLoadedImages++;
      console.log(numOfLoadedImages);
      if(numOfLoadedImages === count) {
        numOfLoadedImages = 0
        loadAgain = true;
        console.log('loaded here 111')
      }
    });

    // Put image and a in imagesContainer
    a.appendChild(img);
    imagesContainer.appendChild(a);
  });
};

// connect to Unsplash Api

const apiKey = "z9VLPrtHg9bKrGwn2csb-5m0_tTqzjTqlIGSWzowlko";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getImage() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data, "111");
    useData(data);
  } catch (error) {
    console.log(error);
  }
}

// Event Listeners
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    loadAgain === true
  ) {
    console.log("loaded again");
    loadAgain = false;
    getImage();
  }
});

//onLoad
getImage();
