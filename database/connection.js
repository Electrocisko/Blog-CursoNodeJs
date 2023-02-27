import mongoose from "mongoose";
import dotenvConfig from '../config/config.js'

//the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('strictQuery', false)


const conecctionString = dotenvConfig.MONGOURI;

const conecction = async () => {
    try {
        await mongoose.connect(conecctionString);
        console.log('Conectado a MongoDB')
    } catch (error) {
        throw new Error("No se ha podido conectar a base de datos")
    }
}

export default conecction;