exports = module.exports = function(app) {

    var users = {};
    // Sockets connection
    app.io.sockets.on('connection', function (socket) {

        var me = socket.request.user;

        for (var user in users) {
            socket.emit('res_login', users[user]);
        }

        socket.on('req_login', require('./event.js').login(app, socket, users, me));

        socket.on('req_message', require('./event.js').message(app, socket, me));

        socket.on('req_status', require('./event.js').status(app, socket, me));

        socket.on('disconnect', function() {
            delete users[me.id];
            app.io.sockets.emit('res_logout', me);
        });

    });
}