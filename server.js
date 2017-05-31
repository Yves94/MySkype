// Require all needed tools
var express = require('express');
var session = require('express-session');
var mySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 8000;
var path = require('path');
var engine = require('ejs-mate');
var passport = require('passport');
var flash = require('connect-flash');
var mysql = require('mysql');
var dbconfig = require('./config/database');
var db = mysql.createConnection(dbconfig.connection);

var options = {
    host: dbconfig.connection.host,
    port: dbconfig.port,
    user: dbconfig.connection.user,
    password: dbconfig.connection.password,
    database: dbconfig.database
};

app.sessionStore = new mySQLStore(options);

var Say = require('say');

// Configure Express
app.use(morgan('dev')); // Log console
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Configure Passport
app.use(session({
    secret: 'mysecretsessionpassphrase',
    resave: true,
    saveUninitialized: true,
    store: app.sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/routes')(app, passport);

// Server is launch
say = new Say();
say.success('Server running on port ' + port);

// Test connection with database (MySQL)
db.connect(function(err) {
    if (err) {
        console.log(err);
        return false;
    }
    say.success('Database MySQL is running');
});

// Sockets
app.server = require('http').createServer(app).listen(port);
app.io = require('socket.io').listen(app.server);

require('./config/passport')(app, passport, express, cookieParser);

require('./app/sockets')(app);

say.success('Socket ready to listen on port ' + port);

