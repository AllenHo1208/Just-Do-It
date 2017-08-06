var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(__dirname, 'build')));
var server = app.listen(process.env.PORT || 8082, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});