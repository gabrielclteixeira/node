const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Middlewares  

app.use(morgan('dev'));

app.use( (req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use( (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// End of middlewares

app.use('/app/v1/tours', tourRouter)
app.use('/app/v1/users', userRouter)

module.exports = app;

