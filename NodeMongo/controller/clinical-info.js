let ClinicalInfoSchema = require('../model/clinical-info');


module.exports.newClinicalInfoSchema = async (admDate, bed, bodyTemp, bpm, sato2, timestamp, bloodPress) => {
    try {
        let clinicalInfo = await ClinicalInfoSchema({
            admDate: admDate,
            bed: bed,
            bodyTemp: bodyTemp,
            bloodPress: bloodPress,
            bpm: bpm,
            sato2: sato2,
            timestamp: timestamp
        });
        let response = await clinicalInfo.save();
        return {success: true, response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err}
    }
}
