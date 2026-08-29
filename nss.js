const { chromium } = require("playwright");

const IMSS_NSS_URL =
  "https://serviciosdigitales.imss.gob.mx/gestionAsegurados-web-externo/asignacionNSS";

async function runNssJob({ curp, email, outlookPassword }) {
  // En esta primera prueba NO se escribe la contraseña en logs ni archivos.
  // Se mantiene solamente dentro de esta ejecución.

  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("NSS: abriendo portal IMSS");
    await page.goto(IMSS_NSS_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    await page.getByLabel("CURP").fill(curp);
    await page.getByLabel("Correo electrónico").fill(email);

    // El portal solicita confirmar el correo.
    const confirmEmail = page.getByLabel("Confirma tu correo electrónico");
    if (await confirmEmail.count()) {
      await confirmEmail.fill(email);
    }

    // El portal actual muestra CAPTCHA. No lo resolvemos ni lo evadimos.
    console.log("NSS: esperando intervención humana para CAPTCHA si aparece.");

    // Dejamos esta prueba pausada para que el siguiente paso pueda definirse
    // después de observar el comportamiento real del portal.
    await page.screenshot({ path: "nss-debug.png", fullPage: true });

    // IMPORTANTE:
    // El flujo de domicilio, finalización y recuperación por Outlook aún no se
    // ejecuta automáticamente hasta comprobar la prueba real y sus pantallas.
    console.log("NSS: prueba de navegación/captura completada.");

    await context.close();
  } finally {
    // La contraseña nunca se escribe a disco por este código.
    await browser.close();
  }
}

module.exports = { runNssJob };
