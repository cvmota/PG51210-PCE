var express = require("express");
var router = express.Router();
var SensorController = require('../controller/sensor');
const {response} = require("express");

router.get("/", (req, res) => {
    res.json({
        rota: "sensores"
    })
})

router.get("/identificador/:id", (req, res) => {
    res.json({
        identificador: req.params.id,
    })
})

router.get("/list/", async (req, res) => {
    const sensorResponse = await SensorController.listSensors();
    res.status(200).json(sensorResponse.sensors);
})

router.get("/list/:id", async (req, res) => {
    const sensorResponse = await SensorController.findSensorById(req.params.id);
    res.status(200).json(sensorResponse.response);
})

router.post("/add/", async (req, res) => {
    const sensorResponse = await SensorController.newSensor(req.body.sensorid, req.body.sensornum, req.body.sensortype);
    if (sensorResponse.success) {
        res.status(200).json({success: true, message: "Sensor " + req.params.id + " criado com sucesso!"});
    } else {
        res.status(200).json({
            success: false,
            message: "Erro a criar o sensor " + req.params.id + ". Motivo: " + sensorResponse.response
        });
    }
})

router.post("/update/", async (req, res) => {
    const sensorResponse = await SensorController.updateSensor(req.body.sensorid, req.body.sensor_info);
    res.status(200).json(sensorResponse.response);
})

router.delete("/delete/:id", async (req, res) => {
    const sensorResponse = await SensorController.deleteSensor(req.params.id);
    if (sensorResponse.success) {
        res.status(200).json({success: true, message: "Sensor " + req.params.id + " eliminado com sucesso!"});
    } else {
        res.status(200).json({
            success: true,
            message: "Erro a eliminar o sensor " + req.params.id + ". Motivo: " + sensorResponse.response
        });
    }
})

module.exports = router;
