const { all } = require("../app");
const Tour = require("../models/tourModel");

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = async (req, res) => {
    try{

        const allTours = await Tour.find();

        res.status(200).json({
            status: 'success',
            data: {
                allTours
            }
        })

    }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }
}

exports.getTour = async (req, res) =>  {
   try{
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })

   }
   catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
   }
    
}

exports.updateTour = async (req, res) => {

    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            data: {
                tour
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }

}

exports.deleteTour = async (req, res) => {

    try{

        const tour = await Tour.findByIdAndDelete(req.params.id)
        
        res.status(204).json({
            status: 'success',
            data: null
        });

    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }


}

exports.createTour  = async (req, res) => {

    try{
        const createdTour = await Tour.create(req.body);
    
        res.status(201).json({
            status: 'Success!',
            data: createdTour
        })

    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data was sent!'
        })
    }

}