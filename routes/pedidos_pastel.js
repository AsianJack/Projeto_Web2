const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const PedidoController = require('../controller/pedidos_pastelController');
const pedidoController = new PedidoController();
const pastelController = require('../controller/pastelController')
const PastelController = new pastelController();

const auth = require('../middleware/autenticacao')
router.use(auth);

router.get('/pedidos', async(req, res) => {
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
  
router.get('/editarPedido/:id', (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId);
  pedidoController.findOne(teste)
    .then((pedidos) => {
        res.render('editarPedido', { pedidos: pedidos, produto: produto, produtos: produtos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o pedido.' });
    });
});

router.post('/editarPedido', (req, res) => {
  const clienteId = req.user.clienteId;

  const { id, usina, produto, quantidade, preco, destino } = req.body;
  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    clienteId,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  pedidoController.updatePedido(id, novoPedido)
    .then(() => {
      res.redirect('/pedidos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o pedido.' });
    });
});

router.delete('/:id', (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId);

  pedidoController.deletePedido(teste)
    .then((result) => {
      res.status(200).json({ result: result + "Pedido deletado." });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o pedido.' });
    });
});

router.post('/', (req, res) => {
  const clienteId = req.user.clienteId;
  const { usina, produto, quantidade, preco, destino } = req.body;
  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    clienteId,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  pedidoController.createPedido(novoPedido)
    .then(() => {
      res.redirect('/pedidos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});

module.exports = router;
