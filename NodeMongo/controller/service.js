let ServiceSchema = require('../model/service');

module.exports.newService = async (id, descr) => {
    try {
        let service = await ServiceSchema({serviceID: id, serviceDesc: descr});
        let response = await service.save();
        return {success: true, response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err}
    }
}