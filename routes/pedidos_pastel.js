const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const PedidoController = require('../controller/pedidos_pastelController');
const pedidoController = new PedidoController();
const pastelController = require('../controller/pastelController')
const PastelController = new pastelController();

const auth = require('../middleware/autenticacao')
router.use(auth);

router.get('/pedidos', async (req, res) => {
  const clienteId = req.user.UID;
  pedidoController.readPedidos(clienteId)
    .then((pedidos) => {
      res.render('home', { pedidos: pedidos });
    })
    .catch((error) => {
      console.log("deubom")
      res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de pedidos.' });
    });
});

router.get('/novoPedido', (req, res) => {
  PastelController.readPasteis()
    .then((pasteis) => {
      res.render('criar_pedido', { pasteis: pasteis });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os pasteis.' });
    });
});

router.get('/editarPedido/:id', async (req, res) => {
  try {
    const pedidoId = req.params.id;
    const id = new ObjectId(pedidoId);
    const pedidos = await pedidoController.findOne(id);
    const pastel = await PastelController.findOnenome(pedidos.pastel);
    const pasteis = await PastelController.readPasteis();
    
    pasteisfiltro = pasteis.filter((pasteis) => pasteis.nome !== pastel.nome);
    console.log(pedidos);
    res.render('editar_pedido', { pedidos, pastel, pasteisfiltro });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar o pedido ou produto.' + error });
  }
});

router.post('/editarPedido', (req, res) => {
  const clienteId = req.user.UID;

  const { id, pastel,quantidade, preco, } = req.body;
  const novoPedido = {
    pastel,
    quantidade,
    preco,
    clienteId,
    timestamp: new Date().getTime(),
  };

  pedidoController.updatePedido(id, novoPedido)
    .then(() => {
      res.redirect('/pedidos/pedidos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o pedido.' });
    });
});

router.delete('/:id', (req, res) => {
  const pedidoId = req.params.id;
  const id = {_id:new ObjectId(pedidoId)};

  pedidoController.deletePedido(id)
    .then((result) => {
      res.status(200).json({ result: result + "Pedido deletado." });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o pedido.' });
    });
});

router.post('/', (req, res) => {
  const clienteId = req.user.UID;
  const { pastel, quantidade, preco } = req.body;
  const novoPedido = {
    pastel,
    quantidade,
    preco,
    clienteId,
    timestamp: new Date().getTime(),
  };

  pedidoController.createPedido(novoPedido)
    .then(() => {
      res.redirect('/pedidos/pedidos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});

module.exports = router;
