var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var sleep = require('sleep');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index');
});
app.post('/change', function(req, res) {
  console.log('/change');
  console.log(req.body);
  io.emit('events', JSON.stringify(req.body));
  res.send("OK");
});

// Socket
io.on('connection', function(socket) {
  console.log('A client connected');
  io.emit('events', "THOONG"); 
});

http.listen(5000, function() {
  console.log("Listening on *:5000");
});

