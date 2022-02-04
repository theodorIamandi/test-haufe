const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");


/* Health Check */
router.get('/', (req, res, next) => {
    let config = req.appConfig;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

/* Create */
router.post('/:entity', (req, res, next) => {
    let config = req.appConfig;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

/* Read / List */
router.get('/:entity', (req, res, next) => {
    let config = req.appConfig;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

/* Read / Record */
router.get('/:entity/:id', (req, res, next) => {
    let config = req.appConfig;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

/* Update */
router.put('/:entity/:id', (req, res, next) => {
    let config = req.appConfig;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

/* Delete / Record */
router.delete('/:entity/:id', (req, res, next) => {
    let config = req.appConfig;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

module.exports = router