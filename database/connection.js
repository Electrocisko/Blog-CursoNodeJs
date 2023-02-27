import mongoose from "mongoose";

//the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('strictQuery', false)


const conecctionString = 'mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/?retryWrites=true&w=majority';

const conecction = async () => {
    try {
        await mongoose.connect(conecctionString);
        console.log('Conectado a MongoDB')
    } catch (error) {
        throw new Error("No se ha podido conectar a base de datos")
    }
}

export default conecction;