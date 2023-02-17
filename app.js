const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.end('Hello from the server!');
// });

// app.post('/', (req, res) => {
//     res.end('Hello from the server!');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/app/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

app.get('/app/v1/tours/:id', (req, res) => {
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
    
});

app.patch('/app/v1/tours/:id', (req, res) => {

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
    

});

app.post('/app/v1/tours', (req, res) => {
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

});

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

