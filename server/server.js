// Require the dependencies.
const express = require('express');
// Use app to call express methods and set the PORT to 3000.
const app = express();
const PORT = process.env.PORT || 3000;
// Use the express static method to serve the browser the files in the client/dist folder.
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Require the html Routes file and pass in the app so that the routes can be used.
require('./routes/htmlRoutes')(app);
// This uses the listen method to start the server on the PORT.
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
