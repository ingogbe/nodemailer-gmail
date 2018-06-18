module.exports = function (app, nodemailer) {

	const Index = app.controllers.index;

	app.get('/', Index.index);

}
