var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CareTakerSchema = new Schema({
    id: {type: Number, unique: true},
    name: {type: String}
})

module.exports = mongoose.model('caretaker', CareTakerSchema)