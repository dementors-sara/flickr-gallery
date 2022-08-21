const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();
let port = 3000;

app.use(express.static('dist'));
///TODO: Add default route

app.use('/lookup-gallery', async (req, res) => {
  const data = {
    method: 'flickr.urls.lookupGallery',
    url: 'https://www.flickr.com/photos/196317236@N03/galleries/72157720979920508/',
    api_key: process.env.FLICKR_API_KEY,
  };

  const parameters = new URLSearchParams(data);
  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.log('ERROR', err);
  }
});

app.use('/get-photos', async (req, res) => {
  const data = {
    method: 'flickr.galleries.getPhotos',
    gallery_id: '196294182-72157720979920508',
    api_key: process.env.FLICKR_API_KEY,
  };

  const parameters = new URLSearchParams(data);
  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.log('ERROR', err);
  }
});

app.listen(port, function () {
  console.log('Server listening on port %s', port);
});
