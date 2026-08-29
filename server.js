const express = require("express");
const { runNssJob } = require("./nss");

const app = express();
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "imss-nss-worker" });
});

app.post("/jobs/nss", async (req, res) => {
  const { curp, email, outlookPassword } = req.body || {};

  if (!/^[A-Z0-9]{18}$/i.test(curp || "")) {
    return res.status(400).json({ message: "CURP inválida: deben ser 18 caracteres." });
  }

  if (!email || !outlookPassword) {
    return res.status(400).json({ message: "Faltan correo o contraseña." });
  }

  // La respuesta se devuelve rápido; el trabajo real corre aparte.
  res.status(202).json({
    message: "Solicitud recibida. El automatizador inició el trámite."
  });

  runNssJob({
    curp: curp.toUpperCase(),
    email,
    outlookPassword
  }).catch((err) => {
    console.error("NSS job failed:", err.message);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Worker escuchando en :${port}`);
});
