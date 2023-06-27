var express = require('express');
var router = express.Router();
require('dotenv').config();
const auth = require('../middleware/autenticacao')
const nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function (req, res, next) {
  const error = "error";
  const status = req.query.status; // Recebe o status do servidor como parâmetro na URL

  if (status === '404') {
    res.render('index', { erro: error });
  } else {
    res.render('index');
  }

});

router.get('/contato', function (req, res, next) {
  res.render('contato');
});
router.get('/sobre', function (req, res, next) {
  res.render('sobre');
});
router.get('/tecnologias', function (req, res, next) {
  res.render('tecnologias');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.post('/email', (req, res) => {

  const { email, nome, assunto, mensagem } = req.body;

  const options = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: assunto,
    text: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erro ao enviar o e-mail.');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.render('index')
    }
  });
});

router.get('/logout', auth, async (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
