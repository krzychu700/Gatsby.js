import mongoose from "mongoose";

export const Character = mongoose.model('Character', { 
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
  relations: String
});