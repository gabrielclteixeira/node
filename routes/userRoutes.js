const express = require('express');

const router = express.Router();



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

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;