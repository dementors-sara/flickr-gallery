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
      let output;
      imageUrls.forEach((url) => {
        output += `
                      <ul>
                          <li><img src="${url}"></li>
                      </ul> `;
      });

      document.getElementById('flickr-images').innerHTML = output;
      return json;
    })
    .then(() => {
      clearTimeout(timer);
    });
}

function createImageUrl(item) {
  return `http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
}
