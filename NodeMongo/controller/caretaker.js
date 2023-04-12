let CareTakerSchema = require("../model/caretaker");

module.exports.newCareTaker = async (id, name) => {
    try {
        let caretaker = await CareTakerSchema({
            id: id,
            name: name
        });
        let response = await caretaker.save();
        return {success: true, response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err}
    }
}