//lib
var webshot = require('webshot');
//web
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function(req, res) {
	res.render('index');
});
app.get('/view', function(req, res) {
	var filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.png';
	var options = {
		screenSize: {
			width: 1280,
			height: 2000
		},
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:61.0) Gecko/20100101 Firefox/61.0'
	};
	webshot(req.query.url, 'public/' + filename, options, function(err) {
		res.render('view',{src: '/' + filename, link: req.query.url});
	});
});
app.listen(8080, function () {
});