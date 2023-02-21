const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours
        }
    });
}

exports.getTour = (req, res) =>  {

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

exports.updateTour = (req, res) => {

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

exports.deleteTour = (req, res) => {

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

exports.createTour  = (req, res) => {
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