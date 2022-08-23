function showImages() {
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
    });
}

function createImageUrl(item) {
  return `http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
}
