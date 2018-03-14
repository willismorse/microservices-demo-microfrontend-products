const express = require('express');
const app = express();

/*
// For testing purposes, live in the root directory
app.use(express.static('./public'))
app.use(express.static('./dist'))
*/

// Map incoming path requests '/products' to our '/public' and '/dist' folders. In other words, live in the subdirectory 'products'
app.use('/products',express.static('public'));
app.use('/products',express.static('dist'));

// Add explicit routing support for liveness and readiness probes. Note that these probes don't care about response content, they just want to see a response code of 200
app.get('/products/liveness', (req, res) => res.send('Live!'));
app.use('/products/readiness', (req, res) => res.send('Ready!'));


app.use(function(req, res, next) {
    res.status(404).send('products microfrontend: could not find resource: ' + req.url);
});

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(8080, () => console.log('microfrontend-hostapp listening on port 8080!'));