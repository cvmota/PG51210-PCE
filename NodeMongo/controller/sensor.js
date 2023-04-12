let SensorSchema = require('../model/sensor');

module.exports.newSensor = async (sensorid, sensornum, type) => {
    try {
        let sensor = await SensorSchema({sensorid: sensorid, sensornum: sensornum, type_of_sensor: type});
        let response = await sensor.save();
        return {success: true, response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err}
    }
}

module.exports.listSensors = async () => {
    try {
        let sensors = await SensorSchema.find();
        return {success: true, sensors};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
}

module.exports.findSensorById = async (id) => {
    try {
        let sensor = await SensorSchema.findOne({sensorid: id});
        return {success: true, response: sensor};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
}

module.exports.updateSensor = async (id, sensor_info) => {
    try {
        let sensor = await SensorSchema.findOneAndUpdate({sensorid: id}, sensor_info, {new: true});
        return {success: true, response: sensor};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
}

module.exports.deleteSensor = async (id) => {
    try {
        let sensor = await SensorSchema.findOneAndDelete({sensorid: id});
        return {success: true, response: sensor};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
}

