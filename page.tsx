"use client";

import { useState } from "react";

export default function Home() {
  const [curp, setCurp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (curp.trim().length !== 18) {
      setStatus("La CURP debe tener exactamente 18 caracteres.");
      return;
    }

    setStatus("Enviando solicitud al automatizador…");

    const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
    if (!workerUrl) {
      setStatus("Falta configurar NEXT_PUBLIC_WORKER_URL.");
      return;
    }

    try {
      const res = await fetch(`${workerUrl}/jobs/nss`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curp: curp.trim().toUpperCase(),
          email: email.trim(),
          outlookPassword: password
        })
      });

      const data = await res.json();
      setStatus(data.message || (res.ok ? "Trabajo iniciado." : "Error al iniciar."));
      setPassword("");
    } catch {
      setStatus("No fue posible contactar al automatizador.");
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Trámite de NSS</h1>
        <p className="muted">Automatizador personal — Fase 1</p>

        <form onSubmit={submit}>
          <label>CURP</label>
          <input
            value={curp}
            onChange={(e) => setCurp(e.target.value)}
            maxLength={18}
            autoCapitalize="characters"
            placeholder="CURP de 18 caracteres"
            required
          />

          <label>Correo Outlook</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@outlook.com"
            required
          />

          <label>Contraseña Outlook</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />

          <button type="submit">Iniciar trámite</button>
        </form>

        <div className="status">
          <strong>Estado:</strong> {status || "Esperando datos…"}
        </div>

        <p className="warning">
          El CAPTCHA y cualquier verificación de seguridad se realizan manualmente.
          La aplicación no intenta evadirlos.
        </p>
      </section>
    </main>
  );
}
