const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
const app = express();
let port = 3000;

//TODO: Do not do this
let galleryId;

app.use(express.static('dist'));
//TODO: Add default route

app.use('/lookup-gallery', async (req, res) => {
  const data = {
    method: 'flickr.urls.lookupGallery',
    url: 'https://www.flickr.com/photos/196317236@N03/galleries/72157720979920508/',
    api_key: process.env.FLICKR_API_KEY,
  };

  const parameters = new URLSearchParams(data);
  const url = `https://api.flickr.com/services/rest/?${parameters}&format=json&nojsoncallback=1`;
  try {
    fetch(url, { method: 'GET' })
      .then((resp) => resp.json())
      .then((json) => {
        galleryId = json.gallery.id;
        return res.json(json);
      });
  } catch (e) {
    console.error('ERROR', e);
  }
});

//TODO: Endpoint for single image (get-photos/:imageId)
app.use('/get-photos', (req, res) => {
  try {
    fetch('http://127.0.0.1:3000/lookup-gallery').then((json) => {
      const data = {
        method: 'flickr.galleries.getPhotos',
        gallery_id: galleryId,
        api_key: process.env.FLICKR_API_KEY,
      };

      const parameters = new URLSearchParams(data);
      const url = `https://api.flickr.com/services/rest/?${parameters}&format=json&nojsoncallback=1`;

      fetch(url, { method: 'GET' })
        .then((resp) => resp.json())
        .then((json) => res.json(json));
    });
  } catch (err) {
    console.log('ERROR', err);
  }
});

app.listen(port, function () {
  console.log('Server listening on port %s', port);
});
