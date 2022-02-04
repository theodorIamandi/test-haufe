const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const sessionRoutes = require("./routes/session");
const apiRoutes = require("./routes");

const app = express();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/session', sessionRoutes);
app.use('/api/v1', apiRoutes);

app.appConfig = {
    prisma: prisma
}


module.exports = app;
