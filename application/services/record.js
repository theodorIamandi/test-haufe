
const createRecord = async (config, data) => {
    return await config.prisma[data.entity].create({
        data: data.payload,
    })
};

const readRecord = async (config, data) => {
    return await config.prisma[data.entity].findUnique({
        where: { id: data.id },
    })
};

const readRecords = async (config, data) => {
    return await config.prisma[data.entity].findMany({
        skip: data.offset,
        take: data.maxSize,
        where: data.where
    });
};

const updateRecord = async (config, data) => {
    return await config.prisma[data.entity].update({
        where: { id: data.id },
        data: data.payload
    });
};

const deleteRecord = async (config, data) => {
    return await config.prisma[data.entity].delete({
        where: { id: data.id },
    });
};

module.exports = { createRecord, readRecord, readRecords, updateRecord, deleteRecord }