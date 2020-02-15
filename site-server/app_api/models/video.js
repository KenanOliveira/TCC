var mongoose = require('mongoose');
var video = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    linkImagem: {
        type: String
    },
    descricao: {
        type: String
    },
    tag: {
        type: String
    },
    dataPublicacao: {
        type: Date
    }
});
module.exports = mongoose.model('Video', video);