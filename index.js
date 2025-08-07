const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const PUSHCUT_URL = "https://api.pushcut.io/YOUR_NOTIFICATION_URL";
const PUSHCUT_API_KEY = "SUA_API_KEY_DO_PUSHCUT";

app.post("/webhook", async (req, res) => {
  const data = req.body;

  if (!data.user_id || !data.amount) {
    return res.status(400).send("Dados inválidos.");
  }

  const message = ID ${data.user_id} acabou de depositar R$ ${parseFloat(data.amount).toFixed(2)} 🚀;

  try {
    await axios.post(PUSHCUT_URL, {
      text: message,
    }, {
      headers: {
        'API-Key': PUSHCUT_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send("Notificação enviada com sucesso.");
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).send("Erro ao enviar Pushcut.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
