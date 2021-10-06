const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;
	if (url === '/users') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<head><title>Users Page</title></head>');
		res.write('<body>');
		res.write('<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>');
		res.write(
			'<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create</button></form>'
		);
		res.write('</body>');
		res.write('</html>');
		return res.end();
	}
	if (url === '/create-user' && method === 'POST') {
		const body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const username = parsedBody.split('=')[1];
			console.log('username is ' + username);
			res.statusCode = 302;
			res.setHeader('Location', '/');
			res.end();
		});
	}
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<head><title>Home Page</title></head>');
	res.write('<body><h1>Hello from my Node.js server</h1></body>');
	res.write('</html>');
	res.end();
});

server.listen(3001);
