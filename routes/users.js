const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UsuarioController = require('../controller/usuarioController');
const usuarioController = new UsuarioController();


router.get('/cadastrar', (req, res) => {
  res.render('criar_conta');
});

router.post('/cadastrar', (req, res) => {
  const { nome, email, senha, data_nascimento, sexo } = req.body;

  const novoUsuario = {
    nome,
    email,
    senha,
    data_nascimento,
    sexo,
  };

  usuarioController.createUsuario(novoUsuario)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o Usuário.' });
    });
});

router.post('/login', (req, res) => {
  const email = req.body.username;
  const senha = req.body.password;

  usuarioController.findOne({ email, senha })
    .then(user => {
      if (user) {
        const token = jwt.sign({ UID: user._id }, process.env.JWT_SENHA, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/pedidos/pedidos');
      } else {
        res.status(400).json({ error: 'Email ou senha inválidos' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});



module.exports = router;
