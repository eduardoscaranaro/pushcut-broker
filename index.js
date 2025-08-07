const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const PUSHCUT_URL = "https://api.pushcut.io/0UDHn1qVYl9SqsiLv0Iyv/notifications/deposit_made";

app.post("/webhook", async (req, res) => {
  try {
    const { data } = req.body;

    if (!data  !data.user_id  !data.amount) {
      return res.status(400).send("Payload inválido.");
    }

    const message = ID ${data.user_id} acabou de depositar R$ ${parseFloat(data.amount).toFixed(2)} 🚀;

    await axios.post(PUSHCUT_URL, {
      input: {
        message
      }
    });

    res.status(200).send("Notificação enviada com sucesso.");
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).send("Erro interno.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
