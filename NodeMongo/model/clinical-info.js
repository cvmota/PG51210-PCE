var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {v4: uuidv4} = require('uuid');

var BloodPressSchema = new Schema({
    systolic: {type: Number},
    diastolic: {type: Number}
})
var ClinicalInfoSchema = new Schema({
    clinicalInfoID: {type: String, unique: true, require: true, default: uuidv4},
    admDate: {type: Date},
    bed: {type: String},
    bodyTemp: {type: Number},
    bloodPress: BloodPressSchema,
    bpm: {type: Number},
    sato2: {type: Number},
    timestamp: {type: Date}
})

module.exports = mongoose.model('clinical-info', ClinicalInfoSchema)