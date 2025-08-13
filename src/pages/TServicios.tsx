import { useState, useEffect } from 'react';
import { Header } from '../components/Header';

const TServicios = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
      <Header isMobile={isMobile} isAdmin={false} />
      <div className="flex flex-col gap-5 p-10 text-xs pt-30 text-neutral-500">
        <h1 className="text-xl font-light">
          📜 TÉRMINOS DE SERVICIO – PLAN4ME
        </h1>
        Última actualización: 1 de octubre de 2025 <br /> <br />
        Estos Términos de Servicio (en adelante, los “Términos”) constituyen un
        acuerdo legalmente vinculante entre usted (“Usuario”, “usted”) y Plan4Me
        (“nosotros”, “nuestro” o “la Compañía”), que regula el acceso, registro
        y/o uso de los servicios, aplicaciones, software, API, sitios web,
        contenidos y demás funcionalidades, ya sea de forma gratuita o mediante
        contraprestación, ofrecidos por Plan4Me (en conjunto, los “Servicios”).
        El uso de los Servicios está condicionado a la aceptación plena, expresa
        y sin reservas de estos Términos. Al acceder, registrarse o utilizar los
        Servicios, usted reconoce haber leído, comprendido y aceptado quedar
        legalmente obligado por estos Términos y por cualesquiera modificaciones
        que, en cualquier momento y a nuestra sola discreción, podamos
        introducir. En caso de no aceptar estos Términos, deberá abstenerse de
        acceder o utilizar los Servicios.
        <h1 className="text-xl font-light">1. Definiciones</h1>A efectos de
        interpretación y aplicación de los presentes Términos: • “Compañía”:
        hace referencia a Plan4Me, sus subsidiarias, matrices, filiales,
        empleados, contratistas, licenciantes, licenciatarios, representantes,
        agentes y demás entidades vinculadas directa o indirectamente. •
        “Usuario”: toda persona física o jurídica que acceda, se registre,
        interactúe o utilice los Servicios, ya sea de manera directa o
        indirecta, por sí misma o a través de terceros autorizados o no
        autorizados. • “Contenido”: toda información, material, dato, texto,
        imagen, audio, video, código, plan de alimentación, lista de compras,
        recomendación o funcionalidad generada por la Compañía, por el Usuario o
        por terceros a través de los Servicios. • “Uso No Autorizado”: cualquier
        uso contrario a estos Términos, a la legislación vigente o a las buenas
        prácticas, incluyendo, sin limitarse, la manipulación, alteración,
        ingeniería inversa, extracción de datos, copia, distribución o
        comercialización no autorizada del Contenido.
        <h1 className="text-xl font-light">
          2. Objeto y Alcance de los Servicios
        </h1>
        Plan4Me proporciona planes de alimentación y listas de compras
        exclusivamente con fines informativos, educativos y de bienestar
        general. No proveemos diagnóstico médico, tratamiento, prescripción,
        terapia ni recomendaciones de carácter clínico. La información
        suministrada no sustituye ni pretende sustituir la evaluación,
        diagnóstico o tratamiento de un profesional sanitario debidamente
        acreditado. El Usuario reconoce y acepta que cualquier decisión basada
        en el Contenido será tomada bajo su única y exclusiva responsabilidad.
        <h1 className="text-xl font-light">3. Condiciones de Uso</h1>
        El Usuario se obliga a: 1. Utilizar los Servicios únicamente para fines
        personales, lícitos y no comerciales, salvo autorización expresa y por
        escrito de la Compañía. 2. Proporcionar información veraz, exacta,
        actualizada y completa en todo momento. 3. Abstenerse de manipular,
        eludir o interferir en los sistemas de seguridad, autenticación o
        control de acceso implementados por la Compañía. 4. No realizar
        ingeniería inversa, descompilación, extracción masiva de datos (“data
        scraping”), reventa o sublicencia del Contenido. 5. No introducir
        software malicioso, virus, scripts automatizados o cualquier otro código
        diseñado para interrumpir, dañar o limitar el funcionamiento de los
        Servicios.
        <h1 className="text-xl font-light">
          4. Exención de Garantías y Responsabilidad
        </h1>
        EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEGISLACIÓN APLICABLE, LOS
        SERVICIOS SE PROPORCIONAN “TAL CUAL” (“AS IS”) Y “SEGÚN DISPONIBILIDAD”
        (“AS AVAILABLE”), SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS,
        INCLUYENDO, SIN LIMITARSE, GARANTÍAS DE IDONEIDAD PARA UN PROPÓSITO
        PARTICULAR, COMERCIABILIDAD, DISPONIBILIDAD ININTERRUMPIDA, EXACTITUD O
        AUSENCIA DE ERRORES. Plan4Me NO GARANTIZA que: • Los Servicios
        satisfagan las expectativas o necesidades específicas del Usuario. • Los
        planes alimenticios o recomendaciones produzcan resultados concretos o
        medibles. • El Contenido esté libre de inexactitudes, errores, omisiones
        o desactualizaciones. El Usuario reconoce que: • Cualquier resultado,
        impacto, cambio o efecto derivado de la utilización de los Servicios
        será de su exclusiva responsabilidad. • La Compañía no asume
        responsabilidad alguna por daños directos, indirectos, incidentales,
        consecuenciales, punitivos o ejemplares (incluyendo, sin limitarse,
        pérdidas de ingresos, datos, reputación, oportunidades comerciales,
        salud física o mental), aun cuando hubiera sido advertida de la
        posibilidad de tales daños. • El uso de los Servicios no crea relación
        médico-paciente ni relación fiduciaria.
        <h1 className="text-xl font-light">
          5. Limitación Máxima de Responsabilidad
        </h1>
        En cualquier caso, y sin perjuicio de lo establecido anteriormente, la
        responsabilidad total de Plan4Me, por cualquier causa y bajo cualquier
        teoría jurídica (contractual, extracontractual, objetiva o de otra
        índole), no excederá en conjunto el importe total efectivamente pagado
        por el Usuario a la Compañía en un mes (1) meses anteriores al evento
        que origine la reclamación o, en caso de uso gratuito, el equivalente a
        cero dólares estadounidenses (USD $0.00).
        <h1 className="text-xl font-light">6. Indemnidad</h1>
        El Usuario se compromete a indemnizar, defender y mantener indemne a la
        Compañía frente a cualquier reclamación, demanda, pérdida,
        responsabilidad, daño, coste o gasto (incluyendo honorarios razonables
        de abogados) derivados del incumplimiento de estos Términos, del uso
        indebido de los Servicios o de la infracción de derechos de terceros.
        <h1 className="text-xl font-light">
          7. Modificaciones y Actualizaciones
        </h1>
        La Compañía se reserva el derecho, a su sola discreción y sin previo
        aviso, de modificar, suspender o interrumpir total o parcialmente los
        Servicios, así como de actualizar estos Términos. La versión vigente
        estará siempre disponible en la plataforma y la utilización posterior de
        los Servicios constituirá aceptación de los cambios.
        <h1 className="text-xl font-light">8. Terminación</h1>
        Podremos suspender o cancelar el acceso del Usuario a los Servicios, con
        o sin causa y con o sin notificación previa, sin que ello genere derecho
        a indemnización alguna.
        <h1 className="text-xl font-light">
          9. Legislación Aplicable y Jurisdicción
        </h1>
        Estos Términos se rigen e interpretan conforme a las leyes sustantivas
        de Mexico, excluyendo sus normas sobre conflicto de leyes. El Usuario
        acepta someterse a la jurisdicción exclusiva de los tribunales
        competentes en Culiacan, Sin., Mexico para cualquier controversia
        derivada o relacionada con estos Términos.
      </div>
    </div>
  );
};

export default TServicios;
