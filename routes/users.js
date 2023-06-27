const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UsuarioController = require('../controller/usuarioController');
const usuarioController = new UsuarioController();
const PedidoController = require('../controller/pedidos_pastelController');
const pedidoController = new PedidoController();
const auth = require('../middleware/autenticacao');
const { ObjectId } = require('mongodb');
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

router.get('/telaeditar', auth, (req, res) => {
  const clienteId = req.user.UID;
  usuarioController.findOneId(clienteId)
    .then((usuario) => {
      res.render('editar_conta', { usuario: usuario })
    }).catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Ocorreu um erro.' + error });
    });
})

router.post('/editar', auth, (req, res) => {
  const clienteId = req.user.UID;
  const { nome, email, senha, data_nascimento, sexo } = req.body;
  const novoUsuario = {
    nome,
    email,
    senha,
    data_nascimento,
    sexo,
  };

  usuarioController.updateUsuario(clienteId, novoUsuario)
    .then(() => {
      res.redirect('/pedidos/pedidos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o Usuário.' });
    });
});

router.delete('/', auth, (req, res) => {
  const clienteId = req.user.UID;
  const id = { _id: new ObjectId(clienteId) };

  usuarioController.deleteUsuario(id)
    .then((result) => {
      const query = { clienteId: clienteId }
      pedidoController.deletePedidoMany(query)
        .then(() => {
          res.status(200).json({ result: result + "usuario deletado." });
        }).catch((error) => {
          res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o pedido.' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o usuario.' });
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
        res.status(404).redirect('/?status=404');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});



module.exports = router;
