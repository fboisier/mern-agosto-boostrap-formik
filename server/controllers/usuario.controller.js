const { Usuario } = require('../models/usuario.model');

module.exports.createUsuario = (request, response) => {
    console.log(request.body);
    Usuario.create(request.body).then(usuario => response.json(usuario))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllUsuarios = (request, response) => {
    Usuario.find({})
        .then(usuarios => response.json(usuarios))
        .catch(err => response.status(400).json(err))
}

module.exports.getUsuario = (request, response) => {
    Usuario.findOne({_id:request.params.id})
        .then(usuario => response.json(usuario))
        .catch(err => response.status(400).json(err))
}

module.exports.updateUsuario = (request, response) => {
    console.log(request.params.id, request.body);
    Usuario.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedUsuario => response.json(updatedUsuario))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteUsuario = (request, response) => {
    Usuario.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}