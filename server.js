const express = require('express')
const app = express()

app.use(express.static('build'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8080, () => console.log('microfrontend-hostapp listening on port 8080!'))