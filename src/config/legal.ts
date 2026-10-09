import {
  SITE_NAME,
  SITE_LEGAL_NAME,
  SITE_CITY,
  SITE_WHATSAPP_DISPLAY,
  SITE_EMAIL,
  SITE_RIF,
} from "./site";

export type LegalDocumentId = "terminos" | "privacidad";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  id: LegalDocumentId;
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}

const updatedAt = "9 de octubre de 2026";

export const LEGAL_DOCUMENTS: Record<LegalDocumentId, LegalDocument> = {
  terminos: {
    id: "terminos",
    title: "Términos y Condiciones",
    updatedAt,
    intro: `Bienvenido(a) a ${SITE_NAME}. Estos Términos y Condiciones regulan el acceso y uso del sitio web y la contratación de los servicios de transporte ofrecidos a través de WhatsApp y del presente portal. Al solicitar una cotización o contratar un servicio, aceptas los términos aquí descritos.`,
    sections: [
      {
        heading: "1. Identificación del prestador",
        paragraphs: [
          `Este sitio es operado por ${SITE_LEGAL_NAME} (en adelante “NovaDrive”), con sede en ${SITE_CITY}, RIF ${SITE_RIF}.`,
          `Para cualquier consulta puedes escribirnos al correo ${SITE_EMAIL} o a través de WhatsApp al ${SITE_WHATSAPP_DISPLAY}.`,
        ],
      },
      {
        heading: "2. Objeto",
        paragraphs: [
          `NovaDrive presta servicios de transporte privado de pasajeros: Taxi Express, Transporte Escolar, Transporte Universitario y Transporte Empresarial. Los traslados pueden ser puntuales (por viaje) o programados (mensuales o quincenales), según lo acordado entre las partes.`,
        ],
      },
      {
        heading: "3. Cotizaciones y precios",
        paragraphs: [
          "Todos los precios publicados son de referencia y pueden variar según la distancia, la duración del recorrido, el número de pasajeros, la zona y la frecuencia del servicio.",
          "La cotización preliminar se genera a través del formulario de contacto o WhatsApp. El precio final se confirma antes de aceptar la reserva, de modo que no existen cargos ocultos ni anticipos.",
        ],
      },
      {
        heading: "4. Reservas y confirmación",
        paragraphs: [
          "Para traslados puntuales recomendamos reservar con al menos 1–2 horas de anticipación. Para rutas escolares, universitarias o empresariales, lo ideal es coordinar con varios días de anticipación para asegurar disponibilidad.",
          "Una reserva se considera confirmada cuando NovaDrive la acepta expresamente a través de WhatsApp u otro canal acordado, indicando precio, horario y punto de encuentro.",
        ],
      },
      {
        heading: "5. Formas de pago",
        paragraphs: [
          "Aceptamos pago móvil y divisas (USD), según lo acordado previamente.",
          "Los traslados puntuales (Taxi Express) se cobran por viaje. Las rutas programadas se pagan mensualmente o cada 15 días, de acuerdo con lo pactado entre NovaDrive y el cliente.",
        ],
      },
      {
        heading: "6. Obligaciones del usuario",
        paragraphs: [
          "El usuario se compromete a proporcionar datos veraces al momento de solicitar el servicio (origen, destino, horario y pasajeros), a estar en el punto de recogida a la hora acordada y a comunicar cualquier cambio con la mayor anticipación posible.",
          "El usuario respeta las normas de convivencia dentro del vehículo y la capacidad máxima de pasajeros del mismo.",
        ],
      },
      {
        heading: "7. Responsabilidad y seguridad",
        paragraphs: [
          "NovaDrive pondrá el mayor cuidado en la conducción y en el mantenimiento del vehículo. El servicio se presta en el estado y condiciones acordadas y dentro de los límites de la normativa de tránsito vigente en Venezuela.",
          "La responsabilidad de NovaDrive se limita al valor del servicio contratado, salvo dolo o culpa grave, y en ningún caso incluye daños indirectos o consecuentes.",
          "NovaDrive no se hace responsable por retrasos causados por condiciones de tráfico, clima, vías en mal estado u otras circunstancias fuera de su control razonable.",
        ],
      },
      {
        heading: "8. Menores de edad",
        paragraphs: [
          "El Transporte Escolar y el traslado de menores se coordina directamente con el padre, madre o representante. NovaDrive prioriza la seguridad y puntualidad, y no prestará el servicio si el adulto responsable no ha entregado la información de contacto y los puntos de recogida.",
        ],
      },
      {
        heading: "9. Cancelaciones y reprogramaciones",
        paragraphs: [
          "Las cancelaciones o cambios de horario deben comunicarse a través de WhatsApp lo antes posible. Para rutas programadas, los cambios se coordinan con la anticipación que el caso permita.",
          "Los pagos mensuales o quincenales corresponden al período acordado; los reembolsos por servicios no prestados se evalúan caso a caso, siempre que el cliente haya cumplido el proceso de cancelación establecido.",
        ],
      },
      {
        heading: "10. Propiedad intelectual",
        paragraphs: [
          `Los contenidos del sitio web (textos, logotipos, imágenes y diseño) son de titularidad de ${SITE_NAME} o de sus licenciantes. Queda prohibida su reproducción o uso comercial sin autorización previa y por escrito.`,
        ],
      },
      {
        heading: "11. Protección de datos",
        paragraphs: [
          "El tratamiento de tus datos personales se rige por nuestra Política de Privacidad y Cookies, que forma parte integral de estos Términos y Condiciones.",
        ],
      },
      {
        heading: "12. Modificación de los términos",
        paragraphs: [
          `NovaDrive puede actualizar estos Términos y Condiciones en cualquier momento. La versión vigente será la publicada en el sitio, por lo que te recomendamos revisarla periódicamente.`,
        ],
      },
      {
        heading: "13. Legislación aplicable",
        paragraphs: [
          "Estos términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier controversia será sometida a los tribunales competentes de la ciudad de Maracaibo, estado Zulia.",
        ],
      },
    ],
  },

  privacidad: {
    id: "privacidad",
    title: "Política de Privacidad y Cookies",
    updatedAt,
    intro: `En ${SITE_NAME} respetamos tu privacidad. Esta política explica qué información recopilamos, con qué finalidad, cómo la protegemos y qué derechos tienes sobre ella, en línea con las normas aplicables en Venezuela sobre protección de datos personales.`,
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        paragraphs: [
          `${SITE_LEGAL_NAME}, con sede en ${SITE_CITY} y RIF ${SITE_RIF}, es responsable del tratamiento de los datos personales recolectados a través de este sitio web y de los canales de comunicación (WhatsApp y correo electrónico).`,
        ],
      },
      {
        heading: "2. Datos que recopilamos",
        paragraphs: [
          "Datos de contacto y del traslado: nombre o identificación, número de WhatsApp, origen, destino, fechas y horarios, y cualquier detalle que decidas compartir en el formulario o por WhatsApp.",
          "Datos técnicos básicos que tu navegador transmite de forma automática (dirección IP, tipo de navegador, páginas visitadas) cuando se utilizan herramientas de analítica.",
        ],
      },
      {
        heading: "3. Finalidad del tratamiento",
        paragraphs: [
          "Responder a tus solicitudes de cotización y coordinar los servicios solicitados de transporte.",
          "Contactarte para confirmar reservas, horarios, precios y cualquier ajuste del servicio.",
          "Mejorar la experiencia y el funcionamiento del sitio web mediante estadísticas agregadas y anónimas.",
          "Cumplir con obligaciones legales y proteger los derechos de NovaDrive y de los usuarios.",
        ],
      },
      {
        heading: "4. WhatsApp y mensajería",
        paragraphs: [
          "Al enviar una cotización, la conversación se realiza a través de WhatsApp (Meta), cuyos términos y políticas de privacidad aplican a la plataforma de mensajería. NovaDrive trata esa información únicamente en el marco del servicio contratado.",
          "Te recomendamos no compartir información bancaria, contraseñas o datos sensibles por canales de mensajería.",
        ],
      },
      {
        heading: "5. Compartición con terceros",
        paragraphs: [
          "No vendemos ni alquilamos datos personales. Solo compartimos información con proveedores que nos ayudan a operar el servicio (por ejemplo, WhatsApp y plataformas de analítica o hosting), siempre bajo acuerdos que garanticen la confidencialidad y el cumplimiento de la ley.",
        ],
      },
      {
        heading: "6. Cookies y tecnologías similares",
        paragraphs: [
          "Las cookies son pequeños archivos que el sitio guarda en tu dispositivo para recordar tus preferencias y medir el uso de la página.",
          "Actualmente el sitio no instala cookies de seguimiento. Si en el futuro utilizamos cookies propias o de terceros (por ejemplo, analítica), te lo informaremos en este documento y solicitaremos tu consentimiento antes de activarlas, salvo que sean estrictamente necesarias para el funcionamiento del sitio.",
          "Puedes configurar tu navegador para bloquear o eliminar cookies en cualquier momento. Recuerda que, si el consentimiento es necesario, rechazarlas no impedirá tu navegación normal.",
        ],
      },
      {
        heading: "7. Conservación de los datos",
        paragraphs: [
          "Conservamos los datos únicamente durante el tiempo necesario para prestar el servicio, gestionar reservas, atender consultas y cumplir obligaciones legales. Al cumplirse el plazo, los datos se eliminan o anonimizan.",
        ],
      },
      {
        heading: "8. Derechos del interesado",
        paragraphs: [
          "Tienes derecho a acceder a tus datos personales, solicitar su rectificación, actualización o eliminación, y oponerte u objetar a su tratamiento para fines distintos de los pactados.",
          "Puedes ejercer estos derechos escribiendo a ${SITE_EMAIL} o por WhatsApp al ${SITE_WHATSAPP_DISPLAY}. Atenderemos tu solicitud en un plazo razonable y confirmaremos su resultado.",
        ],
      },
      {
        heading: "9. Seguridad",
        paragraphs: [
          "Adoptamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema de transmisión o almacenamiento es 100 % seguro.",
        ],
      },
      {
        heading: "10. Cambios en esta política",
        paragraphs: [
          `Podemos actualizar esta política cuando sea necesario para reflejar cambios en nuestros servicios o en la normativa. La versión vigente se publicará siempre en este sitio, indicando su fecha de actualización.`,
        ],
      },
      {
        heading: "11. Contacto",
        paragraphs: [
          `Si tienes dudas sobre esta Política de Privacidad y Cookies o sobre el tratamiento de tus datos, escríbenos a ${SITE_EMAIL} o por WhatsApp al ${SITE_WHATSAPP_DISPLAY}.`,
        ],
      },
    ],
  },
};