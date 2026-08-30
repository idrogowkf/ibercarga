# Ibercarga — Sprint 1

## Incluido

- Home comercial en español e inglés.
- Formulario de contacto conservado y reutilizado en todas las páginas.
- 5 páginas de servicio en español.
- 5 páginas equivalentes en inglés.
- React Router con URLs limpias.
- Metadatos dinámicos, canonical, hreflang, Open Graph y JSON-LD.
- Schema Organization, Service, BreadcrumbList y FAQPage.
- Sitemap actualizado.
- Rewrites de Vercel para rutas SPA.
- Componentes reutilizables y contenido centralizado en `src/data/services.js`.
- Eliminación de afirmaciones que presentan a Ibercarga como propietaria de flota.

## Instalación sobre tu rama platform-v3

1. Descomprime el paquete.
2. Copia su contenido dentro de `Heavz_project`, aceptando reemplazar archivos.
3. No copies una carpeta `node_modules` desde otra máquina.
4. Ejecuta:

```bash
npm install
npm run build
npm run dev
```

5. Revisa las páginas:

- `/`
- `/en/`
- `/transporte-especial/`
- `/transporte-sobredimensionado/`
- `/transporte-prefabricados/`
- `/transporte-transformadores/`
- `/transporte-maquinaria-pesada/`
- `/en/special-transport/`
- `/en/oversized-cargo-transport/`
- `/en/precast-concrete-transport/`
- `/en/transformer-transport/`
- `/en/heavy-equipment-transport/`

6. Si el build termina correctamente:

```bash
git add .
git commit -m "feat: add bilingual SEO service platform"
git push origin platform-v3
```

## Nota

El endpoint `/api/send-quote` se conserva. Comprueba en la preview de Vercel que las variables de entorno de Resend estén configuradas antes de probar el envío real.
