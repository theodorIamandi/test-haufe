const {createRecord, readRecord, readRecords, updateRecord, deleteRecord} = require("../services/record");

const create = async (req, res, next) => {
    let config = req.app.appConfig

    let record = await createRecord(config,
        { entity: req.params.entity, payload: req.body });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
};

const read = async (req, res, next) => {
    let config = req.app.appConfig

    let record = await readRecord(config,
        { entity: req.params.entity, id: req.params.id });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(record));
};

const list = async (req, res, next) => {
    let config = req.app.appConfig;
    let data = { entity: req.params.entity, query: req.query };

    let recordsList = await readRecords(config, data);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(recordsList));
};

const update = async (req, res, next) => {
    let config = req.app.appConfig;

    let record = await updateRecord(config, {
        entity: req.params.entity,
        id: req.params.id,
        payload: req.body
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(record));
};

const remove = async (req, res, next) => {
    let config = req.app.appConfig;

    let delResponse = await deleteRecord(config, {
        entity: req.params.entity,
        id: req.params.id,
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(delResponse));
};

module.exports = { create, read, list, update, remove }