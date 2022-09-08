const cors = require('cors');
const express = require('express');
const sgMail = require('@sendgrid/mail');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');

var code = bodyParser.urlencoded({extended:false})

app.use(cors());

app.get('/', function (req, res) {
    res.send('/ Get aqui');
});

app.post('/email', code ,function (req, res) {
    dispararEmail(req);
    res.redirect('http://127.0.0.1:5173/pages/Contact/contact.html');
});

app.listen(3000, () => {
    console.log("Servidor ON")
});

async function dispararEmail(req) {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    try {
        const msg = {
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: "Chegou uma mensagem pelo site!",
            html: "<h1>Enviado por: "+req.body.nome+".</h1><p>"+req.body.texto+"</p><br><p>Telefone: "+req.body.telefone+"</p><br><p>Email: "+req.body.email+"</p>",
        };
        const result = await sgMail.send(msg);
        console.log('Email sent', result);
    }
    catch (error) {
        console.error(error)
    }
}