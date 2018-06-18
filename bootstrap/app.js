var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var nodemailer = require('nodemailer');

var app = express();

app.use(logger('dev'));

consign()
	.include('utils')
	.then('models')
	.then('config')
	.then('controllers')
	.then('routes')
	.into(app, nodemailer);

module.exports = app;

var port = process.env.PORT || 5333;

app.listen(port, function () {
    let myConsole = app.utils.myConsole;

	myConsole.logSuccess("NodeJS", "Server", "Running on http://localhost:" + port);

	
	//app.utils.tests.test();


});



