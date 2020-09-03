var express = require('express');
var mailController = require('../controllers/c_mail');
var api = express.Router();

api.post('/email', mailController.sendEmail);

module.exports = api;
