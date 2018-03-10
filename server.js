const express = require('express')
const app = express()

// Map incoming path requests '/products' to our '/public' folder. In other words, live in the subdirectory 'products'
app.use('/products',express.static('build'))

// Add explicit routing support for liveness and readiness probes. Note that these probes don't care about response content, they just want to see a response code of 200
app.use('/products/liveness', express.static('build/index.html'))
app.use('/products/readiness', express.static('build/index.html'))

app.use(function(req, res, next) {
    res.status(404).send('products microfrontend: could not find resource: ' + req.url);
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8080, () => console.log('microfrontend-hostapp listening on port 8080!'))