const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

module.exports = router