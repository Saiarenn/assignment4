require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000

mongoose.connect('mongodb+srv://admin:0000@cluster0.27pnvto.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true, writeConcern: {w: 'majority'},})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));