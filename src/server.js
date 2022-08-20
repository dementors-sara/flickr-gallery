const express = require('express');
const app = express();

let port = 8081;

app.use(express.static('dist'));

app.listen(port, function () {
  console.log('Server listening on port %s', port);
});
