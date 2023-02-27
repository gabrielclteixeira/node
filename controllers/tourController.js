const Tour = require("../models/tourModel");
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours = async (req, res) => {
    try{
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .limitFields()
            .sort()
            .paginate();

        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            total: await Tour.countDocuments(features.queryStr),
            data: {
                tours
            }
        })

    }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `${err}`,
            query: req.query
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

        await Tour.findByIdAndDelete(req.params.id)
        
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

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5} }
            },
            {
                $group: {
                    _id: '$difficulty',
                    numRatings: { $sum: '$ratingsQuantity'},
                    numTours: { $sum: 1},
                    avgRating: { $avg: '$ratingsAverage'},
                    avgPrice: { $avg: '$price'},
                    minPrice: { $min: '$price'},
                    maxPrice: { $max: '$price'},

                }
            },
            {
                $sort: {
                    avgPrice: 1
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: stats
        });
        
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: `${err}`,
            query: req.query
        })
    }
}

exports.getMonthlyPlan = async (req, res) => {
    try{
        const year = req.paras.year * 1;

        const plan = await Tour.aggregate([
            
        ]);

        res.status(200).json({
            status: 'success',
            data: plan
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `${err}`,
            query: req.query
        })
    }
}