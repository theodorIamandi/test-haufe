const {safeObject} = require("../util/functions");

const createRecord = async (config, data) => {
    return safeObject(await config.prisma[data.entity].create({
        data: data.payload,
    }));
};

const readRecord = async (config, data) => {
    return safeObject(await config.prisma[data.entity].findUnique({
        where: { id: data.id },
    }));
};

const readRecords = async (config, data) => {
    let query = {};
    let keys = Object.keys(data.query);

    for(let i in keys) {
        query[keys[i]] = data.query[keys[i]]
        if(data.query[keys[i]].match(/^\d*(\.\d+)?$/)) {
            query[keys[i]] = parseInt(data.query[keys[i]]);
        }
    }

    return safeObject(await config.prisma[data.entity].findMany({
        skip: 0,//data.offset,
        take: 100,//data.maxSize,
        where: query
    }));
};

const updateRecord = async (config, data) => {
    return safeObject(await config.prisma[data.entity].update({
        where: { id: data.id },
        data: data.payload
    }));
};

const deleteRecord = async (config, data) => {
    return safeObject(await config.prisma[data.entity].delete({
        where: { id: parseInt(data.id) },
    }));
};

const findUniqueRecord = async (config, entity, where) => {
    return safeObject(await config.prisma[entity].findUnique({ where: where }));
};

module.exports = { createRecord, readRecord, readRecords, updateRecord, deleteRecord, findUniqueRecord }