const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const PastelController = require('../controller/pastelController');
const pastelController = new PastelController();
const PedidoController = require('../controller/pedidos_pastelController');
const pedidoController = new PedidoController();
const auth = require('../middleware/autenticacao')
router.use(auth);

router.get('/pastel', async (req, res) => {
    pastelController.readPasteis()
        .then((pasteis) => {
            res.render('pastel', { pasteis: pasteis });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de produtos.' });
        });
});


router.get('/novoPastel', (req, res) => {
    res.render('criar_pastel');
});

router.get('/editarPastel/:id', (req, res) => {
    const PastelId = req.params.id;

    const id = new ObjectId(PastelId);
    pastelController.findOne(id)
        .then((Pastel) => {
            console.log(Pastel)
            res.render('editar_pastel', { Pastel });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar o Pastel.' });
        });
});

router.post('/editarPastel', (req, res) => {
    const { id, nome, preco, descricao, PastelAntigo } = req.body;

    const novoPastel = {
        nome,
        preco,
        descricao,
        timestamp: new Date().getTime(),
    };
    const Pastel = req.params.Pastel;

    pastelController.updatePastel(id, novoPastel)
        .then(() => {
            pedidoController.updatePedidoPastel(PastelAntigo, nome)
                .then(() => {
                    res.redirect('/pastel/pastel');
                }).catch((error) => {
                    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o Pastel123.' });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar o Pastel.' });
        });
});

router.delete('/:id/:nome', (req, res) => {
    const PastelId = req.params.id;
    const Pastel = req.params.nome;
    const teste = new ObjectId(PastelId);
    pastelController.deletePastel(teste)
        .then((result) => {
            pedidoController.deletePedidoMany({ pastel: Pastel })
                .then(() => {
                    res.status(200).json({ result: result + "Pastel deletado." });
                }).catch((error) => {
                    res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o Pastel.' });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o Pastel.' });
        });
});

router.post('/', (req, res) => {
    const { nome, preco, descricao } = req.body;

    const novoPastel = {
        nome,
        preco,
        descricao,
        timestamp: new Date().getTime(),
    };

    pastelController.createPastel(novoPastel)
        .then(() => {
            res.redirect('/pastel/pastel');
        })
        .catch((error) => {
            res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o Pastel.' });
        });
});

router.get("/automatico", async (req, res) => {
    const pasteis = [
        { nome: "Pastel de Queijo", preco: 5.99, descricao: "Delicioso pastel recheado com queijo derretido.", timestamp: new Date().getTime() },
        { nome: "Pastel de Carne", preco: 6.99, descricao: "Pastel suculento recheado com carne moída temperada.", timestamp: new Date().getTime() },
        { nome: "Pastel de Frango", preco: 6.49, descricao: "Pastel com recheio de frango desfiado e temperado.", timestamp: new Date().getTime() },
        { nome: "Pastel de Palmito", preco: 5.99, descricao: "Pastel com recheio cremoso de palmito.", timestamp: new Date().getTime() },
        { nome: "Pastel de Calabresa", preco: 6.49, descricao: "Pastel saboroso recheado com calabresa e cebola.", timestamp: new Date().getTime() }
    ];
    console.log(pasteis.length)
    for (var i = 0; i < pasteis.length; i++) {
            await pastelController.createPastel(pasteis[i])
    }
    res.redirect("/pastel/pastel")
})
module.exports = router;
