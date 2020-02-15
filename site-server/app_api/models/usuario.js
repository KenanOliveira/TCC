var mongoose = require('mongoose');
var user = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    hash: String,
    salt: String
});
module.exports = mongoose.model('User', user);