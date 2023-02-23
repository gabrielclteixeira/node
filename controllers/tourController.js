const { query } = require("express");
const { all } = require("../app");
const Tour = require("../models/tourModel");

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = async (req, res) => {
    try{
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryObj = {...req.query};
        const excludedField = ['page', 'sort', 'limit', 'fields'];

        excludedField.forEach(e => delete queryObj[e]) 

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

        console.log(JSON.parse(queryStr));

        let allTours = Tour.find(JSON.parse(queryStr));

        if (req.query.sort){

            const sortBy = req.query.sort.split(',').join(' ');

            allTours = allTours.sort(sortBy);
        } 
        else{
            allTours = allTours.sort('-createdAt');
        }

        if (req.query.fields){
            const fields = req.query.sort.split(',').join(' ');

            allTours = allTours.select(fields);
        }
        else{
            allTours = allTours.select('-__v');
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        allTours = allTours.skip(skip).limit(limit);

        if (req.query.page){
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page exceeds limit!');
        }

        const tours = await allTours;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })

    }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
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