const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");

const recordController = require('../controllers/record');

/* Health Check */
router.get('/', (req, res, next) => {
    let config = req.app.appConfig;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

/* Create */
router.post('/:entity', recordController.create);

/* Read / List */
router.get('/:entity', recordController.list);

/* Read / Record */
router.get('/:entity/:id', recordController.read)

/* Update */
router.put('/:entity/:id', recordController.update);

/* Delete / Record */
router.delete('/:entity/:id', recordController.remove)

module.exports = router