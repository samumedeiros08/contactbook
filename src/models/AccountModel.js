const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true },
    address: { type: String, required: false },
    userId: { type: String, required: true },
    time : { type : Date, default: Date.now },
  
});