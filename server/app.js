require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const mongoose = require("mongoose");
const axios = require("axios");

const PORT = process.env.PORT || 5000

mongoose.connect('mongodb+srv://admin:0000@cluster0.27pnvto.mongodb.net/bookstore?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true, writeConcern: {w: 'majority'},})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)


app.get('/currency', async (req, res) => {
    // const code = req.body.code;
    try {
        const currencyApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
        const currencyResponse = await axios.get(currencyApiUrl);
        const currencyData = currencyResponse.data.rates;

        res.json(currencyData);
    } catch (error) {
        console.error('Error fetching currency data: ', error);

        res.status(500).send('Internal Server Error');
    }
});

app.post('/photo', async (req, res) => {
    const apiKey = "30856833-7403c4fca5957f3a24a6fce79";
    const title = req.body.title;
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${title}&image_type=photo`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data.hits.map(hit => hit.webformatURL).slice(0, 3);

        res.json(data);
    } catch (error) {
        console.error('Error fetching photo: ', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));