require.paths.unshift(__dirname + '/lib');
require.paths.unshift(__dirname);

var http = require('http'),
  static = require('deps/node-static/lib/node-static')
var port = 8001;


var file = new(static.Server);
var server = http.createServer(function (request, response) {
	request.addListener('end', function () {
		file.serve(request, response, function(err, result) {
			if (err) {
				console.log("Error serving " + request.url + " - " + err.message);
				response.writeHead(err.status, err.headers);
				response.end();
			}
		});
	});
});
server.listen(port);
console.log("New server started on port " + port);