// This variable for requiring a dependency is used to join the path to the index.html file in the client/dist folder.
const path = require('path');
// The app parameter is used to get the index.html file from the client/dist folder and send it to the browser.
module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
