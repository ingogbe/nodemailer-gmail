module.exports = function (app, nodemailer) {
	const myConsole = app.utils.myConsole;

	/*
	 *
	 * How to get tokens:
	 * https://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-one/24123550 
	 *
	 */

	const refresh_token = 'your_refresh_token';
    const client_id     = 'your_client_id';
    const client_secret = 'your_client_secret';

	return {
		refresh_token: refresh_token,
		client_id: client_id,
		client_secret: client_secret,

		lesseSecureApps: {
			createTransporter: function(user, pass){
				return nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: user,
						pass: pass
					}
				});
			}
		},

		createTransporter: function(){
			return nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					type: 'OAuth2',
					clientId: this.client_id,
					clientSecret: this.client_secret
				}
			});
		},

		getEmailOptions: function(from, to, subject, text, html){
			return {
				from: from,
				to: to,
				subject: subject,
				text: text,
				html: html,
				auth: {
					user: from,
					refreshToken: this.refresh_token,
					expires: new Date().getTime() + 2000
				}
			};
		}
	}

}

