/* =========================================================
   RADAR TELETRABAJO
   Lógica principal de la aplicación
   ========================================================= */


/* =========================================================
   1. CONFIGURACIÓN
   ========================================================= */

const CONFIG = {
    MIN_JOB_OFFERS: 3,
    MAX_JOB_OFFERS: 5
};


/* =========================================================
   2. ESTADO DE LA APLICACIÓN
   ========================================================= */

const state = {
    skills: []
};


/* =========================================================
   3. ELEMENTOS DEL DOM
   ========================================================= */

const elements = {

    /* Navegación */

    startAnalysis: document.getElementById("startAnalysis"),
    analysisSection: document.getElementById("analysis"),


    /* Objetivo */

    jobRole: document.getElementById("jobRole"),
    experienceLevel: document.getElementById("experienceLevel"),
    targetMarket: document.getElementById("targetMarket"),
    workType: document.getElementById("workType"),


    /* Perfil */

    skillsInput: document.getElementById("skillsInput"),
    addSkill: document.getElementById("addSkill"),
    skillsList: document.getElementById("skillsList"),
    languages: document.getElementById("languages"),
    profileNotes: document.getElementById("profileNotes"),


    /* Ofertas */

    jobOffers: document.getElementById("jobOffers"),
    addJobOffer: document.getElementById("addJobOffer"),


    /* Generación */

    generatePrompt: document.getElementById("generatePrompt"),
    formMessage: document.getElementById("formMessage"),


    /* Resultado */

    promptResult: document.getElementById("promptResult"),
    generatedPrompt: document.getElementById("generatedPrompt"),
    copyPrompt: document.getElementById("copyPrompt"),
    resetForm: document.getElementById("resetForm")

};


/* =========================================================
   4. UTILIDADES
   ========================================================= */


/**
 * Desplaza la página suavemente hacia un elemento.
 */

function scrollToElement(element) {

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/**
 * Elimina espacios innecesarios de un texto.
 */

function cleanText(text) {

    return text.trim();

}


/**
 * Convierte una lista en texto legible.
 */

function formatList(items) {

    if (!items || items.length === 0) {
        return "No especificado";
    }

    return items.join(", ");

}


/**
 * No toma en consideración los signos de puntuación.
 */

function normalizeSkill(skill) {
    return skill
        .trim()
        .toLowerCase()

        // Eliminar acentos y otros signos diacríticos
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

        // Eliminar signos de puntuación
        .replace(/[.,;:!?¿¡'"“”‘’()[\]{}]/g, "")

        // Convertir varios espacios en uno
        .replace(/\s+/g, " ")

        .trim();
}


/* =========================================================
   5. GESTIÓN DE HABILIDADES
   ========================================================= */


/**
 * Añade una nueva habilidad al estado.
 */

function addSkill() {

    const skill = cleanText(elements.skillsInput.value);

    if (!skill) {
        return;
    }


    /* Evitar duplicados sin importar mayúsculas */

    const normalizedSkill = normalizeSkill(skill);

    const skillExists = state.skills.some(
        existingSkill =>
            normalizeSkill(existingSkill) === normalizedSkill
    );


    if (skillExists) {

        showMessage(
            "Esa habilidad ya está añadida.",
            "error"
        );

        return;

    }


    state.skills.push(skill);

    elements.skillsInput.value = "";

    renderSkills();

    clearMessage();

}


/**
 * Elimina una habilidad.
 */

function removeSkill(skill) {

    state.skills = state.skills.filter(
        item => item !== skill
    );

    renderSkills();

}


/**
 * Muestra las habilidades en pantalla.
 */

function renderSkills() {

    elements.skillsList.innerHTML = "";


    state.skills.forEach(skill => {

        const tag = document.createElement("div");

        tag.className = "skill-tag";


        const skillText = document.createElement("span");

        skillText.textContent = skill;


        const removeButton = document.createElement("button");

        removeButton.type = "button";

        removeButton.className = "skill-remove";

        removeButton.textContent = "×";

        removeButton.setAttribute(
            "aria-label",
            `Eliminar habilidad ${skill}`
        );


        removeButton.addEventListener("click", () => {
            removeSkill(skill);
        });


        tag.appendChild(skillText);

        tag.appendChild(removeButton);

        elements.skillsList.appendChild(tag);

    });

}


/* =========================================================
   6. GESTIÓN DE OFERTAS
   ========================================================= */


/**
 * Añade una nueva oferta.
 */

function addJobOffer() {

    const currentOffers =
        elements.jobOffers.querySelectorAll(".job-offer");


    if (currentOffers.length >= CONFIG.MAX_JOB_OFFERS) {

        showMessage(
            `Puedes analizar un máximo de ${CONFIG.MAX_JOB_OFFERS} ofertas.`,
            "error"
        );

        return;

    }


    const jobNumber = currentOffers.length + 1;


    const jobOffer = document.createElement("article");

    jobOffer.className = "job-offer";

    jobOffer.dataset.jobNumber = jobNumber;


    const header = document.createElement("div");

    header.className = "job-offer-header";


    const title = document.createElement("h4");

    title.textContent = `📄 Oferta ${jobNumber}`;


    header.appendChild(title);


    const textarea = document.createElement("textarea");

    textarea.className = "job-description";

    textarea.rows = 10;

    textarea.placeholder =
        "Pega aquí el texto completo de la oferta...";


    jobOffer.appendChild(header);

    jobOffer.appendChild(textarea);


    /* Permitir eliminar solo ofertas adicionales */

    const removeButton = document.createElement("button");

    removeButton.type = "button";

    removeButton.className = "remove-job-offer";

    removeButton.textContent = "Eliminar oferta";


    removeButton.addEventListener("click", () => {

        jobOffer.remove();

        updateJobNumbers();

        clearMessage();

    });


    jobOffer.appendChild(removeButton);

    elements.jobOffers.appendChild(jobOffer);

    updateAddOfferButton();

}


/**
 * Actualiza los números de las ofertas.
 */

function updateJobNumbers() {

    const offers =
        elements.jobOffers.querySelectorAll(".job-offer");


    offers.forEach((offer, index) => {

        const jobNumber = index + 1;

        offer.dataset.jobNumber = jobNumber;


        const title = offer.querySelector("h4");

        if (title) {
            title.textContent = `📄 Oferta ${jobNumber}`;
        }

    });


    updateAddOfferButton();

}


/**
 * Actualiza el estado del botón de añadir ofertas.
 */

function updateAddOfferButton() {

    const offers =
        elements.jobOffers.querySelectorAll(".job-offer");


    if (offers.length >= CONFIG.MAX_JOB_OFFERS) {

        elements.addJobOffer.disabled = true;

        elements.addJobOffer.textContent =
            `Máximo de ${CONFIG.MAX_JOB_OFFERS} ofertas alcanzado`;

    } else {

        elements.addJobOffer.disabled = false;

        elements.addJobOffer.textContent =
            "+ Añadir otra oferta";

    }

}


/**
 * Obtiene las ofertas con contenido.
 */

function getJobOffers() {

    const jobDescriptions =
        elements.jobOffers.querySelectorAll(".job-description");


    return Array.from(jobDescriptions)
        .map(textarea => cleanText(textarea.value))
        .filter(job => job.length > 0);

}


/* =========================================================
   7. VALIDACIÓN
   ========================================================= */


/**
 * Comprueba que el formulario contiene la información mínima.
 */

function validateForm() {

    const errors = [];


    const jobRole =
        cleanText(elements.jobRole.value);

    const experienceLevel =
        cleanText(elements.experienceLevel.value);

    const targetMarket =
        cleanText(elements.targetMarket.value);

    const workType =
        cleanText(elements.workType.value);

    const jobOffers =
        getJobOffers();


    if (!jobRole) {
        errors.push("Indica el rol profesional que estás buscando.");
    }


    if (!experienceLevel) {
        errors.push("Selecciona tu nivel de experiencia.");
    }


    if (!targetMarket) {
        errors.push("Selecciona el mercado objetivo.");
    }


    if (!workType) {
        errors.push("Selecciona una modalidad de trabajo.");
    }


    if (state.skills.length === 0) {
        errors.push(
            "Añade al menos una habilidad o herramienta que realmente conozcas."
        );
    }


    if (jobOffers.length < CONFIG.MIN_JOB_OFFERS) {

        errors.push(
            `Añade al menos ${CONFIG.MIN_JOB_OFFERS} ofertas con contenido para poder detectar patrones.`
        );

    }


    return {
        isValid: errors.length === 0,
        errors
    };

}


/**
 * Muestra un mensaje al usuario.
 */

function showMessage(message, type = "error") {

    elements.formMessage.innerHTML = "";

    elements.formMessage.className =
        `form-message show ${type}`;


    if (Array.isArray(message)) {

        const list = document.createElement("ul");


        message.forEach(item => {

            const listItem = document.createElement("li");

            listItem.textContent = item;

            list.appendChild(listItem);

        });


        elements.formMessage.appendChild(list);

    } else {

        elements.formMessage.textContent = message;

    }

}


/**
 * Oculta el mensaje actual.
 */

function clearMessage() {

    elements.formMessage.className =
        "form-message";

    elements.formMessage.innerHTML = "";

}


/* =========================================================
   8. PROMPT BUILDER
   ========================================================= */


/**
 * Construye el prompt final.
 */

function buildPrompt() {

    const jobRole =
        cleanText(elements.jobRole.value);

    const experienceLevel =
        cleanText(elements.experienceLevel.value);

    const targetMarket =
        cleanText(elements.targetMarket.value);

    const workType =
        cleanText(elements.workType.value);

    const languages =
        cleanText(elements.languages.value);

    const profileNotes =
        cleanText(elements.profileNotes.value);

    const jobOffers =
        getJobOffers();


    const formattedOffers = jobOffers
        .map((offer, index) => {

            return `
==================================================
OFERTA ${index + 1}
==================================================

${offer}
`;

        })
        .join("\n");


    return `Actúa como un analista especializado en selección, empleo remoto y mercado laboral.

Quiero analizar varias ofertas de trabajo para identificar patrones reales del mercado y mejorar mi estrategia de búsqueda.

IMPORTANTE:
No inventes habilidades, experiencia, certificaciones, resultados ni conocimientos que no estén presentes en mi perfil. La información debe mantenerse fiel a la realidad.

==================================================
MI OBJETIVO PROFESIONAL
==================================================

ROL OBJETIVO:
${jobRole}

NIVEL DE EXPERIENCIA:
${experienceLevel}

MERCADO OBJETIVO:
${targetMarket}

MODALIDAD PREFERIDA:
${workType}


==================================================
MI PERFIL REAL
==================================================

MIS COMPETENCIAS REALES:
${formatList(state.skills)}

IDIOMAS:
${languages || "No especificado"}

INFORMACIÓN ADICIONAL:
${profileNotes || "No especificada"}


==================================================
TU MISIÓN
==================================================

Analiza las ofertas que encontrarás a continuación y realiza lo siguiente:

1. Identifica las competencias, conocimientos, habilidades, herramientas, metodologías, responsabilidades y requisitos que aparecen repetidamente.

2. Clasifica los requisitos en:
   - Imprescindibles.
   - Deseables.
   - Requisitos que aparecen de forma puntual.

3. Extrae las palabras clave más relevantes para sistemas ATS, pero diferencia claramente entre:
   - Palabras clave que puedo utilizar honestamente.
   - Palabras clave relacionadas con habilidades que todavía no poseo.

4. Detecta patrones sobre el tipo de candidato que buscan las empresas.

5. Analiza posibles señales de alerta o "red flags", especialmente relacionadas con:
   - Descripciones ambiguas.
   - Expectativas poco realistas.
   - Disponibilidad excesiva.
   - Falta de información importante.
   - Posibles condiciones laborales confusas.

6. Analiza las condiciones de trabajo remoto cuando la información esté disponible:
   - Restricciones geográficas.
   - Países desde los que se puede trabajar.
   - Huso horario.
   - Modalidad de contratación.
   - Contrato laboral.
   - Contractor o profesional independiente.
   - Employer of Record (EOR), si aparece mencionado.
   - Distingue claramente entre:

    - Trabajo 100 % remoto.
    - Trabajo híbrido.
    - Teletrabajo ocasional o limitado.
    - Puestos presenciales con alguna flexibilidad.

    - No clasifiques una oferta como remota únicamente porque mencione la
    posibilidad de teletrabajo.

7. Busca referencias salariales o económicas únicamente cuando estén presentes en las ofertas.

8. Compara los requisitos encontrados con mi perfil real.

No supongas que poseo conocimientos que no aparecen en mi perfil.

9. Evalúa también si cada oferta es coherente con mi objetivo profesional,
mi nivel de experiencia y el tipo de puesto que busco.

Si alguna oferta pertenece claramente a otro perfil profesional,
especialidad o nivel de seniority, indícalo explícitamente.

No fuerces conclusiones mezclando requisitos de puestos que no sean
realmente comparables.

Cuando detectes ofertas poco relacionadas con mi objetivo, analízalas
individualmente, pero evita utilizarlas para definir los requisitos
generales del perfil que busco.

10. Analiza el contenido real de la descripción del puesto y no te bases
únicamente en su título.

Si el título y las responsabilidades describen perfiles diferentes o
pueden resultar ambiguos, indícalo.

Si alguna oferta contiene información insuficiente, incompleta o no
incluye una descripción real del puesto, indícalo claramente.

No inventes ni deduzcas requisitos que no aparezcan.

Puedes excluir esa oferta del análisis de patrones generales, indicando
que no contiene información suficiente para ser comparada correctamente. 


==================================================
RESULTADO SOLICITADO
==================================================

Organiza el análisis utilizando las siguientes secciones:

A. RESUMEN DEL MERCADO

Explica qué patrones aparecen repetidamente entre las ofertas.


B. MATRIZ DE COMPATIBILIDAD

Crea una tabla con:

COMPETENCIA O REQUISITO | FRECUENCIA | ¿LO TENGO? | PRIORIDAD | ACCIÓN RECOMENDADA


C. HABILIDADES QUE YA PUEDO DESTACAR

Indica qué conocimientos de mi perfil son especialmente relevantes.


D. BRECHAS DE CONOCIMIENTO

Identifica qué habilidades o herramientas aparecen con frecuencia y todavía no forman parte de mi perfil.


E. PALABRAS CLAVE PARA MI CV

Divide las palabras clave en:

- Puedo utilizarlas honestamente.
- Debería aprenderlas antes de incluirlas.


F. PERFIL QUE BUSCA EL MERCADO

Describe qué tipo de candidato parecen buscar estas ofertas.


G. ALERTAS DETECTADAS

Resume cualquier posible señal de alerta, indicando siempre que se trata de una interpretación basada únicamente en la información disponible.


H. MIS 3 PRÓXIMAS ACCIONES

Indica únicamente las tres acciones que probablemente tengan mayor impacto para mejorar mi posición respecto a estas ofertas.

I. COHERENCIA DE LAS OFERTAS

Para cada oferta, indica:

OFERTA | COHERENCIA CON MI OBJETIVO | NIVEL DE EXPERIENCIA | MOTIVO

Clasifica cada una como:

- Alta coherencia.
- Coherencia parcial.
- Baja coherencia.

Explica brevemente cualquier diferencia importante entre el puesto,
mi objetivo profesional y mi nivel actual.

No penalices una oferta simplemente porque represente una oportunidad
de aprendizaje, pero diferencia claramente entre una oportunidad
realista para mi perfil y un puesto que requiere una experiencia o
especialización significativamente superior.

==================================================
OFERTAS PARA ANALIZAR
==================================================

${formattedOffers}

`;

}


/* =========================================================
   9. GENERACIÓN DEL ANÁLISIS
   ========================================================= */


/**
 * Valida el formulario y genera el prompt.
 */

function generateAnalysis() {

    clearMessage();


    const validation =
        validateForm();


    if (!validation.isValid) {

        showMessage(
            validation.errors,
            "error"
        );

        scrollToElement(elements.formMessage);

        return;

    }


    const prompt = buildPrompt();


    elements.generatedPrompt.value =
        prompt;


    elements.promptResult.hidden = false;


    showMessage(
        "Tu prompt se ha generado correctamente.",
        "success"
    );


    setTimeout(() => {

        scrollToElement(elements.promptResult);

    }, 100);

}


/* =========================================================
   10. COPIAR PROMPT
   ========================================================= */


/**
 * Copia el prompt generado al portapapeles.
 */

async function copyGeneratedPrompt() {

    const prompt =
        elements.generatedPrompt.value;


    if (!prompt) {
        return;
    }


    const originalText =
        elements.copyPrompt.textContent;


    try {

        await navigator.clipboard.writeText(prompt);

        elements.copyPrompt.textContent =
            "✓ Prompt copiado";


        setTimeout(() => {

            elements.copyPrompt.textContent =
                originalText;

        }, 2000);

    } catch (error) {

        /*
           Método alternativo para navegadores
           donde Clipboard API no esté disponible.
        */

        elements.generatedPrompt.select();

        document.execCommand("copy");


        elements.copyPrompt.textContent =
            "✓ Prompt copiado";


        setTimeout(() => {

            elements.copyPrompt.textContent =
                originalText;

        }, 2000);

    }

}


/* =========================================================
   11. REINICIAR APLICACIÓN
   ========================================================= */


/**
 * Reinicia todos los datos de la aplicación.
 */

function resetApplication() {

    const confirmed = window.confirm(
        "¿Quieres iniciar un nuevo análisis? Se eliminará la información introducida."
    );


    if (!confirmed) {
        return;
    }


    /* Reiniciar campos */

    elements.jobRole.value = "";

    elements.experienceLevel.value = "";

    elements.targetMarket.value = "";

    elements.workType.value = "";

    elements.skillsInput.value = "";

    elements.languages.value = "";

    elements.profileNotes.value = "";


    /* Reiniciar habilidades */

    state.skills = [];

    renderSkills();


    /* Mantener solo las 3 primeras ofertas */

    const offers =
        Array.from(
            elements.jobOffers.querySelectorAll(".job-offer")
        );


    offers.forEach((offer, index) => {

        const textarea =
            offer.querySelector(".job-description");


        if (index < CONFIG.MIN_JOB_OFFERS) {

            textarea.value = "";

        } else {

            offer.remove();

        }

    });


    updateJobNumbers();

    clearMessage();


    /* Ocultar resultado */

    elements.promptResult.hidden = true;

    elements.generatedPrompt.value = "";


    scrollToElement(elements.analysisSection);

}


/* =========================================================
   12. INICIALIZACIÓN
   ========================================================= */


/**
 * Conecta todos los eventos de la aplicación.
 */

function init() {

    /* Comenzar análisis */

    elements.startAnalysis.addEventListener("click", () => {

        scrollToElement(elements.analysisSection);

    });


    /* Añadir habilidad */

    elements.addSkill.addEventListener("click", addSkill);


    elements.skillsInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            addSkill();

        }

    });


    /* Añadir oferta */

    elements.addJobOffer.addEventListener(
        "click",
        addJobOffer
    );


    /* Generar prompt */

    elements.generatePrompt.addEventListener(
        "click",
        generateAnalysis
    );


    /* Copiar */

    elements.copyPrompt.addEventListener(
        "click",
        copyGeneratedPrompt
    );


    /* Reiniciar */

    elements.resetForm.addEventListener(
        "click",
        resetApplication
    );


    /* Estado inicial */

    updateAddOfferButton();

}


/* =========================================================
   INICIO DE LA APLICACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);
