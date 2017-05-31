var socket = io.connect('http://localhost:8000');

$(function() {

    $('#colorAction span').click(function() {
        $('#profile .avatar').css('border-color', $(this).css('background-color'));
        $('#state').html($(this).data('state'));
        $('.active').remove();
        $(this).append('<span class="active"></span>');
        socket.emit('req_status', { status: $(this).data('code') });
    });

    $('#msgChat .contentMsg').on('keypress', function(event) {
        if (event.keyCode == 13) {
            $('#msgChat .sendMsg').click();
            return false;
        }
    });

    socket.emit('req_login');

    $('#chatArea').scrollTop($('#chatArea').height());

});

$(document).on('click', '#msgChat .sendMsg', function(event) {
    event.preventDefault();

    var msg = $('#msgChat .contentMsg').val();

    // Get cookie for ID user
    socket.emit('req_message', { message: msg, userMsgId: parseInt($('#userId').text()) });
    $('#msgChat .contentMsg').val('');

    $('#chatArea').append('<div class="userMe"><span>' + $('#username').html() + '</span>' + msg + '</div>');
    $('#chatArea').scrollTop($('#chatArea').height());
});

socket.on('res_login', function (data) {
    $('#connectedUser').append('<div class="content" id="user_' + data.id + '"><span class="avatar"><span class="ion-person"></span></span><span class="name">' + data.username + '</span></div>');
    setStatus(data);
});

socket.on('res_logout', function (data) {
    $('#user_' + data.id).remove();
});

socket.on('res_status', function (data) { setStatus(data); });

function setStatus(data) {
    var color;
    switch (data.status) {
        case 1: color = '#00C853'; break;
        case 2: color = '#FBBC05'; break;
        case 3: color = '#EF3B3A'; break;
        default: color = '#ccc'; break;
    }
    $('#user_' + data.id + ' .avatar').css('border-color', color);
}

socket.on('res_message', function (data) {
    $('#chatArea').append('<div class="user"><span>' + data.username + '</span>' + data.message + '</div>');
    $('#chatArea').scrollTop($('#chatArea').height());
});