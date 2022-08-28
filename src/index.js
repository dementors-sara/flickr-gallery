const IMAGE_FETCH_TIMEOUT = 3_000;

window.onload = (event) => {
  showImages();
};

function showImages() {
  let timer = setTimeout(() => {
    console.error('Unable to fetch images data');
  }, IMAGE_FETCH_TIMEOUT);

  fetch('http://127.0.0.1:3000/get-photos')
    .then((response) => response.json())
    .then((json) => {
      let imageUrls = json.photos.photo.map((photo) => createImageUrl(photo));

      imageUrls.forEach((url) => {
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', url);
        document.getElementById('flex-cont').appendChild(imageElement);
      });
      return json;
    })
    .then(() => {
      clearTimeout(timer);
    });
}

function createImageUrl(item) {
  return `http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
}
