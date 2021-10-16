const UsuarioController = require('../controllers/usuario.controller');

module.exports = function(app){
    app.post('/api/usuario', UsuarioController.createUsuario);
    app.get('/api/usuario', UsuarioController.getAllUsuarios);
    app.get('/api/usuario/:id', UsuarioController.getUsuario);
    app.put('/api/usuario/:id', UsuarioController.updateUsuario);
    app.delete('/api/usuario/:id', UsuarioController.deleteUsuario);
}