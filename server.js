// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
var users_routes = require('./routes/r_users');
var email_routes = require('./routes/r_mail');
const { checkAndSendPendings } = require('./controllers/c_requests');

app.use(bodyParser());
app.use(morgan());
app.use('/api', users_routes);
app.use('/api', email_routes);


// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

function startTimer() { 
  setInterval(function() {  
      console.log('Han pasado 15 segundos')
      checkAndSendPendings()
  }, 15000); 
} 

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  startTimer()
});