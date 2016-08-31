'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

var session = require('express-session');
app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool', // or whatever you like
  cookie: {
  } 
}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use(require('./statics.middleware'));



app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('session',req);
  console.log('counter', ++req.session.counter);
  next();
});

app.post('/login',function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;
	User.findAll({where: {
		email: email,
		password: password
	}}).then(function(user){
		var user = user[0];
		console.log('did i found the user',user);
		if(user) {
			req.session.userId = user.id;
			//console.log('.................................',req.session);
			res.sendStatus(200);
		}else{
			res.status(401).send('user not found');
		}
		
	}).catch(next);
})


app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
