const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))

const userRoutes = require('./routes/userRoutes')

app.use('/users', userRoutes)

app.listen(5000)