// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const checkIfAuthenticated = expressJwt({
    secret: 'thisIsTopSecret'
});

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Authentication middleware
app.use(passport.initialize());


passport.use(new LocalStrategy(
//    { passReqToCallback : true},
  function(username, password, done) {
    if ((username === "John") && (password === "password")) {
      return done(null, { username: username, id: 1 });
    } else {
      return done(null, false, "Failed to login.");
    }
  }
));



app.post('/login', passport.authenticate('local', {
    session: false
}),(req,res)=>{
    var token = jwt.sign(req.user, 'thisIsTopSecret', { expiresIn: "7d" });
    res.send({token: token});
});


app.get('/getUserDetails',checkIfAuthenticated, function (req, res){
  if (req){
      const obj = {username: req.user.username, id: req.user.id, savedMovies: [], budget: 30};
    res.send(obj);
  } else {
    res.redirect();
  }
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  if (req){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  } else {
    res.redirect('/login');
  }
});


 // Catch all other routes and return the index file
app.use((err, req, res, next) => {
    res.status(500).send(err);
  });

const port = process.env.PORT || '3000';
app.set('port', port);
 
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

