import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Relation = mongoose.model('Relation', new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  relatedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }
}));