import express from "express";
import mongoose from "mongoose";

export const Character = mongoose.model('Character', { 
  name: String,
  death: String,
  pseudonym: String,
  title: String,
  sex: String,
  race: String,
  profession: String,
  relations: String
});