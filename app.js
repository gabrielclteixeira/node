const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

function getAllTours (req, res) {
    res.status(200).json({
        status: 'success',
        results: tours.length,
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

// app.get('/app/v1/tours', getAllTours);

// app.get('/app/v1/tours/:id', getTour);

// app.patch('/app/v1/tours/:id', updateTour);

// app.delete('/app/v1/tours/:id', deleteTour);

// app.post('/app/v1/tours', createTour);

app
    .route('/app/v1/tours')
    .get(getAllTours)
    .post(createTour);

    app
    .route('/app/v1/tours/:id')
    .patch(updateTour)
    .get(getTour)
    .delete(deleteTour);

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

