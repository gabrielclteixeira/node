// const { query } = require("express");
// const { all } = require("../app");
const Tour = require("../models/tourModel");

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedField = ['page', 'sort', 'limit', 'fields'];

        excludedField.forEach(e => delete queryObj[e]) 

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));

        return this;

        // let query = Tour.find(JSON.parse(queryStr));
    }

    sort(){
        if (this.queryString.sort){

            const sortBy = this.queryString.sort.split(',').join(' ');

            this.query = this.query.sort(sortBy);

        } 

        else{
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limit(){
        if (req.query.fields){
            const fields = req.query.fields.split(',').join(' ');

            query = query.select(fields);
        }
        else{
            query = query.select('-__v');
        }
    }
}

exports.getAllTours = async (req, res) => {
    try{
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        // const queryObj = {...req.query};
        // const excludedField = ['page', 'sort', 'limit', 'fields'];

        // excludedField.forEach(e => delete queryObj[e]) 

        // let queryStr = JSON.stringify(queryObj);

        // queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

        // let query = Tour.find(JSON.parse(queryStr));

        // if (req.query.sort){

        //     const sortBy = req.query.sort.split(',').join(' ');

        //     query = query.sort(sortBy);
        // } 
        // else{
        //     query = query.sort('-createdAt');
        // }

        if (req.query.fields){
            const fields = req.query.fields.split(',').join(' ');

            query = query.select(fields);
        }
        else{
            query = query.select('-__v');
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page){
            const numTours = await Tour.countDocuments(JSON.parse(queryStr));
            if (skip >= numTours) throw new Error('This page exceeds limit!');
        }

        const features = new APIFeatures(Tour.find(), req.query).filter().sort();
        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            total: await Tour.countDocuments(JSON.parse(queryStr)),
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