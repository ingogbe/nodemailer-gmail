module.exports = function (app, nodemailer) {
	const myConsole = app.utils.myConsole;

	return {
		index: function(request, response, next){
			response.send("Hello World!");
		}
	}
}

