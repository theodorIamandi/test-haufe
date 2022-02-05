const express = require('express')
const router = express.Router()

const recordController = require('../controllers/record');

/* Health Check */
router.get('/', (req, res, next) => {
    let config = req.app.appConfig;
    let isRunning = true;

    res.setHeader('Content-Type', 'application/json');

    if(isRunning)
        res.end(JSON.stringify({isRunning: isRunning}));
    else res.sendStatus(410)

    next();
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