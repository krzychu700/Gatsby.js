import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Character = mongoose.model('Character', new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  death: String,
  pseudonym: String,
  title: String,
  sex: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  relations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Relation'
    }
  ]
}));