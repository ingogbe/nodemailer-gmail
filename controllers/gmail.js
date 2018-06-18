module.exports = function (app, nodemailer) {
	const myConsole = app.utils.myConsole;
	const Gmail = app.models.gmail;

	return {

		lesseSecureApps: {
			sendEmail: function (from, to, subject, text, html) {
				let mailOptions = {
					from: from,
					to: to,
					subject: subject,
					text: text,
					html: html
				};

				let transporter = createLSATransporter();

				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						myConsole.logError("NodeJS", "Lesser Secure Apps [sendEmail]", "Erro:");
						myConsole.printObject(error);
					} else {
						myConsole.logSuccess("NodeJS", "Lesser Secure Apps [sendEmail]", 'Email sent: ' + info.response);
					}
				});
			},
		},

		sendEmail: function (from, to, subject, text, html) {
			let transporter = app.models.gmail.createTransporter();

			transporter.on('token', token => {
				myConsole.logWarning("NodeJS", "OAuth [sendEmail]", 'A new access token was generated');
				myConsole.logWarning("NodeJS", "OAuth [sendEmail]", 'User:' + token.user);
				myConsole.logWarning("NodeJS", "OAuth [sendEmail]", 'Access Token: ' + token.accessToken);
				myConsole.logWarning("NodeJS", "OAuth [sendEmail]", 'Expires: ' + new Date(token.expires));
			});
			
			let mailOptions = Gmail.getEmailOptions(from, to, subject, text, html);

			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					myConsole.logError("NodeJS", "OAuth [sendEmail]", "Erro:");
					myConsole.printObject(error);
				} else {
					myConsole.logSuccess("NodeJS", "OAuth [sendEmail]", 'Email sent: ' + info.response);
				}
			});

			
		}
	}
}

