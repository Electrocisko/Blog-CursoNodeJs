// import mongoose from "mongoose";
// import dotenvConfig from '../config/config.js'

const mongoose = require("mongoose");
const dotenvConfig = require('../config/config.js')

//the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('strictQuery', false)

const conecctionString = dotenvConfig.MONGOURI;

const connecction = async () => {
    try {
        await mongoose.connect(conecctionString);
        console.log('Conectado a MongoDB')
    } catch (error) {
        throw new Error("No se ha podido conectar a base de datos")
    }
}

module.exports = connecction;