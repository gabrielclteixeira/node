const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Route functions

function getAllTours (req, res) {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours
        }
    });
}

function getTour(req, res)  {

    console.log(req.params);

    const tour = tours.filter( e => e.id == req.params.id);

    tour.length === 0 
        ? 
            res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            })
        : 
            res.status(200).json({
                status: 'success',
                results: tours.length,
                data: tour
            });
    
}

function updateTour(req, res) {

    const tour = tours.filter( e => e.id == req.params.id);

    tour.length === 0
        ?
            res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            })
        :
            res.status(200).json({
                status: 'success',
                data: {
                    tour: '<Updated tour>'
                }
            });
    

}

function deleteTour(req, res) {

    const tour = tours.filter( e => e.id == req.params.id);

    tour.length === 0
        ?
            res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            })
        :
            res.status(204).json({
                status: 'success',
                data: null
            });
    

}

function createTour (req, res) {
    // console.log(req.body);
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID, }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({ 
            status: 'success',
            results: tours.length,
            data: {
                tour: newTour
            }
        })
    })

}

function getAllUsers(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'Not yet implemented',
        data: null
    })
}

function getUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'Not yet implemented',
        data: null
    })
}

function deleteUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'Not yet implemented',
        data: null
    })
}

function updateUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'Not yet implemented',
        data: null
    })
}

function createUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'Not yet implemented',
        data: null
    })
}

// End of route functions

// Route handling
app.use('/api/v1/tours', tourRouter)
const tourRouter = express.Router();

tourRouter
    .route('/app/v1/tours')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/app/v1/tours/:id')
    .patch(updateTour)
    .get(getTour)
    .delete(deleteTour);

app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


// End of route handling

// Server

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// End of server

