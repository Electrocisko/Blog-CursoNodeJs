import mongoose from "mongoose";

//the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('strictQuery', false)

const conecction = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mi_blog');
        console.log('Conectado a MongoDB')
    } catch (error) {
        throw new Error("No se ha podido conectar a base de datos")
    }
}

export default conecction;