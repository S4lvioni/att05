const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const formidable = require("formidable");

app.use(express.json());
app.use(express.urlencoded());

app.listen(3000);

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "37db168523498c",
        pass: "6de4c0c78666bc"
    }
});

app.get("/", (req, res) => {
    res.redirect("/form.html")
});

app.use(express.static("files"));

app.post("/sent", (req, res) => {
    let form = new formidable.IncomingForm();
    res.send("Enviado!");
    let email;
    let msg;
    form.parse(req, (err, fields) => {
        email = fields.email;
        msg = fields.msg;
    })

    let emailSent = {
        from: "alexandretsalvioni@gmail.com",
        to: email,
        subject: "Enviado usando o Node",
        text: msg
    };
    transport.sendMail(emailSent, (erro, info) => {

        if (erro) {
            console.log(erro);
        } else {
            console.log("Email enviado!" + info.response);
        }
    })
    console.log(email);
    console.log(msg);
})



