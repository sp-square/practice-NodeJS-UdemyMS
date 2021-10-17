const express = require('express');

const app = express();

// app.use((req, res, next) => {
// 	console.log('This always logs');
// 	next();
// });

app.use('/users', (req, res, next) => {
	console.log('users route');
	res.send('<h1>Users page</h1>');
});

app.use('/', (req, res, next) => {
	console.log('home route');
	res.send('<h1>Home page</h1>');
});

app.listen(3000);
