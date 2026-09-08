# Uso de Herramientas de IA

## Herramienta utilizada

Claude Code (Claude, de Anthropic).

## Cómo se usó

- **Planificación y organización del trabajo**: usé Claude para analizar el enunciado del desafío y organizar el desarrollo en una secuencia de pasos claros, tanto para el backend como para el frontend, cada uno pensado como un commit independiente.

- **Escritura de código**: el código de la aplicación (backend y frontend) lo escribí yo. Usé a Claude principalmente como revisor: después de escribir cada archivo se lo mostraba, y me señalaba errores o falencias puntuales (imports faltantes, malas prácticas, inconsistencias de tipos, casos sin manejar). La decisión final de qué corregir, cómo nombrar las cosas, y qué ajustes aplicar siempre fue mía — Claude proponía observaciones, yo evaluaba y decidía.
- **Documentación**: Claude me apoyó en la redacción y estructura de los `README.md` (raíz, backend, frontend) y de este archivo, que revisé y ajusté antes de dejarlos definitivos.

- **Pruebas**: validamos juntos el flujo completo de la aplicación (login, consulta de score, restricciones por rol, logout) antes de dar por cerrada cada parte.

- **Control de versiones**: todos los commits y pushes los hice yo, desde mi cuenta personal de GitHub.
