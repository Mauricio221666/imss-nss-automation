# IMSS NSS Automation — Fase 1

Proyecto personal para automatizar el trámite de Asignación o Localización del Número de Seguridad Social (NSS).

## Arquitectura

- `web/`: interfaz web (pensada para Vercel).
- `worker/`: servicio separado que ejecuta Playwright.
- El worker NO guarda credenciales en base de datos.
- La contraseña de Outlook se recibe únicamente para la ejecución y no se persiste.
- El CAPTCHA del IMSS NO se intenta evadir. La automatización se pausa para intervención humana si aparece.
- El flujo de domicilio se contempla porque el portal actual puede solicitarlo cuando no existe un NSS asociado.

## Importante

Esta primera versión es un esqueleto funcional para probar el flujo real. No contiene credenciales reales ni intenta saltarse controles de seguridad.

## Próximo paso

1. Desplegar `web` en Vercel.
2. Ejecutar `worker` en un servidor que permita navegador Chromium persistente/Playwright.
3. Conectar `web` con `worker`.
4. Probar NSS con una cuenta de prueba.
5. Ajustar selectores y pasos según el comportamiento real del portal.
