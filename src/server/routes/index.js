const users = require('./users');
const auth = require('./auth');
const routes = require('./routes');
const userRoutes = require('./userroutes');

const mid = require('../auth/middlewares');
const API_PREFIX = '/api/v1'

module.exports = (app) => {
	app.use(API_PREFIX, mid.authenticate);
	app.use(`${API_PREFIX}/users/:user/routes`, userRoutes);
	app.use(`${API_PREFIX}/users`, mid.adminRequired, users);
	app.use(`${API_PREFIX}/routes`, routes);
	
	app.use('/auth', auth);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handler
	app.use((err, req, res, next) => {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});

};