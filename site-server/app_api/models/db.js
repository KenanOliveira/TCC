var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/site';
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI,{ useCreateIndex: true, useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    console.log('Mongoose conectado em ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Ocorreu um erro enquanto Mongoose tentou se conectar: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconectado');
});

var gracefullShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconectado através de ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function () {
    gracefullShutdown('reinicialização do nodemon', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function () {
    gracefullShutdown('finalização da aplicação', function () {
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    gracefullShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

//require('./NomeArquivoModelo');
require('./video');