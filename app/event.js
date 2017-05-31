var mysql = require('mysql');
var dbconfig = require('../config/database');
var db = mysql.createConnection(dbconfig.connection);
db.query('USE ' + dbconfig.database);

exports.login = function(app, socket, users, me) {
    return function() {
        // Suppression du mot de passe dans l'objet
        delete me['password'];
        // Status "connecté" par défaut
        me.status = 1;
        // Stockage du nouvel utilisateur dans le tableau des utilisateurs
        users[me.id] = me;
        socket.broadcast.emit('res_login', users[me.id]);
    }
}

exports.message = function(app, socket, me) {
    return function(data) {
        data.username = me.username;
        data.userId = me.id;
        saveMessage(me.id, data.message);
        //app.io.sockets.emit('res_message', data);
        socket.broadcast.emit('res_message', data);
    }
}

exports.status = function(app, socket, me) {
    return function(data) {
        me.status = data.status;
        app.io.sockets.emit('res_status', me);
    }
}

function saveMessage(id, message) {
    var insertMessage = 'INSERT INTO message(id_user, message) VALUE(?,?)';

    db.query(insertMessage, [id, message], function (err, res) {
        if(err) throw err;
        else {
            console.log('New message added');
        }
    });
}

exports.getOldMessages = function(next) {
    var getMessage = 'SELECT u.*, m.* FROM message as m LEFT JOIN user as u ON u.id = m.id_user ORDER BY m.id';

    db.query(getMessage, function (err, rows, fields) {
        if(err) throw err;
        else {
            next(rows);
        }
    });
}
