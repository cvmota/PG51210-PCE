let PatientSchema = require('../model/patient');

module.exports.newPatient = async (id, name, birthdate, age) => {
    try {
        let patient = await PatientSchema({
            patientID: id,
            patientName: name,
            patientBirthdate: birthdate,
            patientAge: age
        });
        let response = await patient.save();
        return {success: true, response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err}
    }
}

