module.exports = function (app, nodemailer) {
	const myConsole = app.utils.myConsole;

	return {
		test: function () {
			let from = "ingogbe92@gmail.com";
			let to = "filipecavalc@gmail.com";
			let subject = "Teste Nodemailer Gmail OAuth";
			let text = null;
			let html = "<h1>Teste</h1><p style='color: red'>Testando, um, dois, três!<br/>Eai Filipe!! Suave?</p>";
		     
			app.controllers.gmail.sendEmail(from, to, subject, text, html);

			myConsole.logSuccess("NodeJS", "Test", "Teste feito com sucesso!");
		}
	}
}

