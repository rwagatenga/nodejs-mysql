const fs = require('fs');

const requestHandle = (req, res) => {
	const url = req.url
	const method = req.method
	console.log('Hello Fred!!');
	//res.write('Content-Type', 'text/html')
	if (url === '/') {
		res.write('<html>')
		res.write('<head><title>NodeJs</title></head>')
		res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
		res.write('</html>')
		return res.end();
	}
	if (url === '/message' && method === 'POST') {
		const body = [];
		req.on('data', (chunks) => {
			console.log(chunks);
			body.push(chunks);
			
		});
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString()
			console.log(parsedBody);
			const message = parsedBody.split('=')[1];
			fs.writeFile('message.txt', message, err => {
				res.statusCode = 302
				res.setHeader('Location', '/')
				return res.end()
			});
		});
	}
	
}

//module.exports = requestHandle;

// module.exports = {
// 	handle: requestHandle,
// 	textMessage: 'Hello Something'
// }

exports.handle = requestHandle;
exports.textMessage = 'Hello Something'