const UsuarioController = require('../controllers/usuario.controller');

module.exports = function(app){
    app.post('/api/usuario', UsuarioController.createUsuario);
    app.get('/api/usuario', UsuarioController.getAllUsuarios);
}