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
