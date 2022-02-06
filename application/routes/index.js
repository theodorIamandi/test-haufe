const express = require('express')
const router = express.Router()

const recordController = require('../controllers/record');

/* Health Check */
router.get('/', async(req, res, next) => {
    let config = req.app.appConfig;
    let isRunning = true;

    res.setHeader('Content-Type', 'application/json');

    let internal = await config.prisma.role.findUnique({ where: { id: 1 } });
    let external = await config.prisma.role.findUnique({ where: { id: 2 } });

    if(internal === null) {
        internal = await config.prisma.role.create({
            data: {
                name: "internal",
                acl: '{\n' +
                    '    "user": ["read", "create", "delete"],\n' +
                    '    "role": ["read"]\n' +
                    '}'
            }
        });
    }
    if(external === null) {
        external = await config.prisma.role.create({
            data: {
                name: "external",
                acl: '{\n' +
                    '    "user": [],\n' +
                    '    "role": []\n' +
                    '}'
            }
        });
    }

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