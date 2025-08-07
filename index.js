const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PUSHCUT_API_KEY = process.env.PUSHCUT_API_KEY;
const PUSHCUT_SCENE_NAME = "nova_broker";

app.post('/webhook', async (req, res) => {
  const event = req.body.event;
  const data = req.body.data;

  if (!event || !data) {
    return res.status(400).send({ error: "Formato inválido" });
  }

  try {
    await axios.post(`https://api.pushcut.io/v1/notifications/${PUSHCUT_SCENE_NAME}`, {
      title: `Evento: ${event}`,
      text: `Nova ação:\nUsuário: ${data.name}\nEmail: ${data.email}`,
      sound: "fanfare"
    }, {
      headers: {
        'API-Key': PUSHCUT_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Erro ao enviar Pushcut" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
