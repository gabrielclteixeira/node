const express = require('express');

// eslint-disable-next-line import/no-dynamic-require
const tourController = require(`${__dirname}/../controllers/tourController`);

const router = express.Router();

// router.param('id', tourController.checkId);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .patch(tourController.updateTour)
    .get(tourController.getTour)
    .delete(tourController.deleteTour);

module.exports = router;