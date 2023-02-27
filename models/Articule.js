import {Schema, model} from "mongoose";

const articuleSchema = Schema({
  titel: {
    type: String,
    required: true,
    },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: "default.png",
  },
});

 const articulesService = model('Articule',articuleSchema,"articules");

export default articulesService;

