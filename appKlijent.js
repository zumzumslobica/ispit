var http = require('http');

var callback = function (response) {
    var body = '';
    response.on('data', function (data) {
        body += data;
    });

    response.on('end', function () {
        // kraj prijema podataka.
        console.log(body);
    });
}
/*
// Svi studenti

var req = http.get({
    host: 'localhost',
    port: '3000',
    path: '/api/Student'
}, callback);
req.end();

// Svi studenti za IT smera
var req = http.get({
    host: 'localhost',
    port: '3000',
    path: '/api/Student?smer=IT'
}, callback);
req.end();

*/

// Student a odredjenim ID-em
var req = http.get({
    host: 'localhost',
    port: '3000',
    path: '/api/Student/1'
}, callback);
req.end();
