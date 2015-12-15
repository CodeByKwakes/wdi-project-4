// NPM Packages
var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require('method-override');
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var config         = require('./config/config');
var Producer       = require('./models/producer');
var Client         = require('./models/client');
var secret         = require('./config/config').secret;


// Database
mongoose.connect(config.database);
require('./config/passport')(passport)

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

// Routes
var routes         = require('./config/routes');
app.use("/api", routes);

// Listening on correct PORT
app.listen(process.env.PORT || 3000);
console.log("Express is listening loud and clear!!!")