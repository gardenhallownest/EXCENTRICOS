const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/enviar-contato', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Configure o transporte do nodemailer
  let transporter = nodemailer.createTransport({
    service: 'proton', // ou outro serviço
    auth: {
      user: 'excentricobros@proton.me',
      pass: 'colate15$kCHOCO'
    }
  });

  // Configuração do email
  let mailOptions = {
    from: email,
    to: 'excentricobros@proton.me',
    subject: `Contato de ${nome}`,
    text: mensagem
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Mensagem enviada com sucesso!');
  } catch (error) {
    res.send('Erro ao enviar mensagem.');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});