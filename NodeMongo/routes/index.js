var express = require("express");
const axios = require("axios");
const SensorController = require("../controller/sensor");
const PatientController = require("../controller/patient");
const ClinicalInfoController = require('../controller/clinical-info');
const CareTakerController = require('../controller/caretaker');
const ServiceController = require('../controller/service');


var router = express.Router();

router.get("/", (req, res) => {
    res.json({
        rota: "index"
    })
})


router.get("/acedehpeixoto/:id", (req, res) => {
    axios.get('http://nosql.hpeixoto.me/api/sensor/' + req.params.id).then(async response => {
        try {
            await processSensor(response.data);
            await processPatient(response.data);
            await processClinicalInfo(response.data);
            await processService(response.data);
            await processCareTeam(response.data);

            res.status(200).json({info: 'Dados processados para o sensor ' + req.params.id + '!'});
            // res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(200).json({info: error.message});
        }
    }).catch(err => {
        console.log(err)
        res.json(err);
    })

})

async function processSensor(data) {
    const {sensorid, sensornum, type_of_sensor} = data;
    let newSensorResponse = await SensorController.newSensor(sensorid, sensornum, type_of_sensor);
    if (!newSensorResponse.success) {
        throw new Error('Erro ao adiconar novo controlador! Motivo: ' + newSensorResponse.response);
    }
}

async function processPatient(data) {
    const {patientid, patientname, patientbirthdate, patientage} = data.patient;
    let newPatientResponse = await PatientController.newPatient(patientid, patientname, patientbirthdate, patientage);
    if (!newPatientResponse.success) {
        throw new Error('Erro ao adiconar novo paciente! Motivo: ' + newPatientResponse.response);
    }
}

async function processClinicalInfo(data) {
    const {admdate, bed, bodyTemp, bloodpress, bpm, sato2, timestamp} = data;
    let newClinicalInfoResponse = await ClinicalInfoController.newClinicalInfoSchema(admdate, bed, bodyTemp, bpm, sato2, timestamp, bloodpress);
    if (!newClinicalInfoResponse.success) {
        throw new Error('Erro ao adiconar a informação clinica! Motivo: ' + newClinicalInfoResponse.response);
    }
}

async function processService(data) {
    const {servicecod, servicedesc} = data;
    let newServiceResponse = await ServiceController.newService(servicecod, servicedesc);
    if (!newServiceResponse) {
        throw new Error('Erro a adicionar o serviço! Motivo: ' + newServiceResponse.response);
    }
}

async function processCareTeam(data) {
    for (const caretaker of data.careteam) {
        let newCareTakerResponse = await CareTakerController.newCareTaker(caretaker.id, caretaker.nome);
        if (!newCareTakerResponse.success) {
            //   throw new Error('Erro ao adicionar o care taker! Reason: ' + newCareTakerResponse.response);
            console.log("O caretaker [" + caretaker.id + " - " + caretaker.nome + "] já existe!")
        }
    }
}

module.exports = router;