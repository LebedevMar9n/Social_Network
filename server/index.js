const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');


require('dotenv').config();
const { authRouter, userRouter, postRouter, uploadRouter } = require('./routes');


const { PORT, MONGO_URL } = require('./constants/config');

mongoose.connect(MONGO_URL);

const app = express();
const port = PORT;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(expressFileUpload());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
// app.use('/upload', uploadRouter);

app.use('*', (req, res) => {
    res.status(404).json('page not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown error'
        });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));