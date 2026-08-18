# 🧭 RadarTeletrabajo

> Analiza ofertas de empleo remoto, detecta patrones y genera un prompt personalizado para ayudarte a entender qué pide realmente el mercado.

**RadarTeletrabajo** es una herramienta gratuita y sencilla que permite comparar varias ofertas de empleo con tu perfil profesional real.

No busca empleo por ti.

No recopila tus datos.

No requiere registro.

Simplemente te ayuda a preparar un análisis más inteligente utilizando Inteligencia Artificial.

---

# 🚀 ¿Qué hace?

Buscar empleo remoto puede convertirse rápidamente en un proceso caótico.

Abrir decenas de pestañas, comparar ofertas, intentar recordar qué requisitos se repetían y adaptar el currículum una y otra vez puede hacer que la búsqueda termine siendo frustrante.

RadarTeletrabajo propone un sistema sencillo:

1. Defines el puesto que estás buscando.
2. Indicas tu nivel de experiencia y mercado objetivo.
3. Añades tus competencias reales.
4. Pegas entre 3 y 5 ofertas de empleo.
5. La aplicación genera un prompt estructurado.
6. Copias ese prompt en tu herramienta de Inteligencia Artificial preferida.
7. Obtienes un análisis comparativo de las ofertas y de tu perfil.

---

# 🎯 ¿Para quién es?

RadarTeletrabajo está pensado para cualquier persona que esté buscando empleo remoto o quiera analizar mejor varias ofertas de trabajo.

Por ejemplo:

- 💻 Perfiles tecnológicos.
- 📊 Administración y gestión.
- 🎨 Diseño y creatividad.
- 📣 Marketing y comunicación.
- 🤝 Atención al cliente.
- 🧑‍🏫 Educación y formación.
- 💼 Recursos Humanos.
- 📈 Ventas y comercial.
- ✍️ Redacción y contenidos.
- 🌍 Traducción e idiomas.
- 🗂️ Asistencia virtual.
- Y muchos otros sectores.

La aplicación no asume que tus competencias sean exclusivamente técnicas.

Puedes añadir conocimientos, habilidades, herramientas, metodologías, experiencias o capacidades que realmente domines.

Por ejemplo:

```text
Excel
Atención al cliente
Gestión de proyectos
Inglés B2
Python
Linux
Comunicación escrita
Resolución de incidencias
Contabilidad
Organización
```

---

# 🛠️ Cómo funciona

## 1. Define tu objetivo

Indica:

- Rol o puesto que buscas.
- Nivel de experiencia.
- Mercado objetivo.
- Modalidad de trabajo.

Esto permite que la Inteligencia Artificial tenga contexto antes de analizar las ofertas.

---

## 2. Añade tus competencias reales

Introduce únicamente aquello que realmente conoces o dominas.

RadarTeletrabajo no está diseñado para inventar habilidades.

La aplicación detecta duplicados ignorando:

- Mayúsculas y minúsculas.
- Espacios innecesarios.
- Signos de puntuación habituales.
- Acentos.

Por ejemplo:

```text
Python
PYTHON
Python,
Python.
```

Se consideran la misma competencia.

---

## 3. Añade entre 3 y 5 ofertas

Pega el texto completo de las ofertas que quieres analizar.

La recomendación es seleccionar ofertas relacionadas con el mismo objetivo profesional.

Sin embargo, el prompt también está preparado para detectar cuándo una oferta pertenece a un perfil profesional, especialidad o nivel de experiencia diferente.

De esta forma, evita mezclar artificialmente requisitos que no representan realmente el mismo tipo de puesto.

---

## 4. Genera el prompt

La aplicación construye automáticamente un prompt estructurado con:

- Tu objetivo profesional.
- Tu nivel de experiencia.
- El mercado que buscas.
- Tus competencias reales.
- Idiomas.
- Información adicional.
- Las ofertas seleccionadas.

---

# 🤖 ¿Qué analiza el prompt?

El prompt generado solicita a la Inteligencia Artificial analizar:

## A. Resumen del mercado

Patrones y requisitos que aparecen repetidamente.

## B. Matriz de compatibilidad

```text
COMPETENCIA O REQUISITO | FRECUENCIA | ¿LO TENGO? | PRIORIDAD | ACCIÓN RECOMENDADA
```

## C. Competencias que ya puedes destacar

Identifica qué partes de tu perfil son especialmente relevantes.

## D. Brechas de conocimiento

Detecta qué requisitos aparecen con frecuencia y todavía no forman parte de tu perfil.

## E. Palabras clave para tu CV

Diferencia entre:

- Palabras clave que puedes utilizar honestamente.
- Conocimientos que deberías adquirir antes de incluirlos.

## F. Perfil que busca el mercado

Analiza qué tipo de candidato parecen buscar las empresas.

## G. Alertas detectadas

Busca posibles señales de alerta relacionadas con:

- Descripciones ambiguas.
- Expectativas poco realistas.
- Disponibilidad excesiva.
- Falta de información relevante.
- Condiciones laborales confusas.
- Restricciones geográficas.
- Modalidades de contratación.

## H. Tus 3 próximas acciones

Propone únicamente tres acciones prioritarias.

## I. Coherencia de las ofertas

Analiza si las ofertas seleccionadas realmente representan el mismo mercado objetivo.

Por ejemplo:

```text
OFERTA | COHERENCIA CON MI OBJETIVO | NIVEL DE EXPERIENCIA | MOTIVO
```

Las clasifica como:

- Alta coherencia.
- Coherencia parcial.
- Baja coherencia.

---

# 🔒 Privacidad

RadarTeletrabajo está diseñado siguiendo un principio sencillo:

> **Tus datos son tuyos.**

La aplicación:

- ❌ No requiere registro.
- ❌ No solicita correo electrónico.
- ❌ No utiliza bases de datos.
- ❌ No envía automáticamente tu información a ningún servidor.
- ❌ No utiliza APIs externas para generar el resultado.

Toda la información introducida se utiliza directamente en el navegador para construir el prompt.

Después, eres tú quien decide qué herramienta de Inteligencia Artificial utilizar y qué información compartir con ella.

---

# 💡 Filosofía

RadarTeletrabajo no pretende sustituir tu criterio.

Tampoco pretende garantizar que conseguirás empleo.

Su objetivo es ayudarte a responder mejor a una pregunta:

> **¿Qué están pidiendo realmente las empresas y qué relación tiene eso con mi perfil actual?**

La Inteligencia Artificial debe utilizarse para analizar, organizar y detectar patrones.

No para inventar experiencia.

Por eso, el prompt incluye instrucciones explícitas para no atribuir al usuario conocimientos, certificaciones, experiencia o resultados que no haya indicado.

---

# 📁 Estructura del proyecto

```text
RadarTeletrabajo/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

El proyecto está construido utilizando únicamente:

- HTML
- CSS
- JavaScript

No requiere:

- Node.js.
- Frameworks.
- Instalación de dependencias.
- Bases de datos.
- Backend.

---

# 💻 Ejecutar localmente

No necesitas instalar nada.

Simplemente descarga o clona el repositorio:

```bash
git clone https://github.com/TU-USUARIO/RadarTeletrabajo.git
```

Después abre:

```text
index.html
```

en tu navegador.

---

# 🌐 Publicar con GitHub Pages

El proyecto está preparado para funcionar directamente con GitHub Pages.

1. Sube los archivos al repositorio.
2. Ve a:

```text
Settings
→ Pages
```

3. En **Build and deployment**, selecciona:

```text
Deploy from a branch
```

4. Selecciona:

```text
Branch: main
Folder: / (root)
```

5. Guarda los cambios.

GitHub publicará automáticamente la aplicación.

---

# 🧪 Funcionalidades actuales

- [x] Diseño responsive.
- [x] Compatible con GitHub Pages.
- [x] Navegación suave.
- [x] Gestión dinámica de competencias.
- [x] Detección de competencias duplicadas.
- [x] Normalización de mayúsculas, acentos y puntuación.
- [x] Análisis de entre 3 y 5 ofertas.
- [x] Añadir y eliminar ofertas adicionales.
- [x] Validación del formulario.
- [x] Generación automática del prompt.
- [x] Copia del prompt al portapapeles.
- [x] Reinicio del análisis.
- [x] Detección de coherencia entre las ofertas.
- [x] Sin registro.
- [x] Sin base de datos.
- [x] Sin envío automático de información.

---

# 🗺️ Posibles mejoras futuras

La primera versión busca ser sencilla.

Algunas ideas que podrían evaluarse en el futuro:

- Guardado local opcional.
- Historial de análisis en el navegador.
- Exportación del prompt.
- Comparación entre diferentes grupos de ofertas.
- Modo de análisis específico para sectores concretos.
- Generación de un segundo prompt para adaptar el CV.
- Ayuda para organizar el seguimiento de candidaturas.

Estas funciones solo se añadirán si aportan una utilidad real sin complicar innecesariamente la herramienta.

---

# 🤝 Contribuciones

Las ideas, mejoras y sugerencias son bienvenidas.

Si detectas un error o crees que RadarTeletrabajo puede analizar mejor algún aspecto del mercado laboral, puedes abrir una incidencia o proponer una mejora.

La prioridad será siempre mantener el proyecto:

- Simple.
- Transparente.
- Útil.
- Accesible.
- Respetuoso con la privacidad.

---

# 📜 Licencia

Pendiente de definir.

---

# 🧭 Ruta TI

RadarTeletrabajo es un proyecto orientado a ayudar a las personas a entender mejor su camino profesional y tomar decisiones con más información.

> **No tienes que saberlo todo hoy. Solo tienes que dar el siguiente paso.**

---

# 🧭 RadarTeletrabajo

**Busca mejor. Entiende mejor. Decide mejor.**