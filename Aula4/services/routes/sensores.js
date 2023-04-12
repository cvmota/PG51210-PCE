var express = require('express');
const {response} = require("express");
var router = express.Router();

var axios = require('axios');

/* GET home page. */
router.get('/identificador/:id', function (req, res, next) {
    res.json({
        identificador: req.params.id,
    });
});

router.get("/acedeHpeixoto/:id", function (req, res) {
    axios.get(
        'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
    ).then(response => {
        res.json(response.data)
    }).catch(err => {
        res.json(err);
        console.log(err);
    })
})

module.exports = router;
