var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    serviceID: {type: String, unique: true},
    serviceDesc: {type: String}
})

module.exports = mongoose.model('service', ServiceSchema)