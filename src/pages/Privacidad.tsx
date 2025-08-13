import { useState, useEffect } from 'react';
import { Header } from '../components/Header';

export const Privacidad = () => {
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
          📄 POLÍTICA DE PRIVACIDAD – PLAN4ME
        </h1>
        Última actualización: 1 de octubre de 2025
        <br />
        <br /> La presente Política de Privacidad (la “Política”) regula el
        tratamiento de datos personales realizado por Plan4Me (“la Compañía”,
        “nosotros”, “nuestro”) en relación con el acceso, registro y/o uso de
        los servicios, aplicaciones, software, API, sitios web, contenidos y
        demás funcionalidades (en conjunto, los “Servicios”). Al acceder o
        utilizar los Servicios, el Usuario (“usted”) acepta expresamente el
        tratamiento de sus datos personales conforme a esta Política. Si no está
        de acuerdo con la misma, deberá abstenerse de utilizar los Servicios.
        <h1 className="text-xl font-light">1. Definiciones</h1>A efectos de
        interpretación de esta Política: • “Datos Personales”: cualquier
        información relativa a una persona física identificada o identificable,
        ya sea proporcionada directamente por el Usuario o generada durante el
        uso de los Servicios. • “Tratamiento”: cualquier operación sobre Datos
        Personales, como recolección, registro, almacenamiento, uso,
        modificación, transmisión, supresión, etc. • “Terceros Autorizados”:
        proveedores, contratistas, socios comerciales, procesadores y
        subprocesadores que intervengan en la prestación, mantenimiento,
        análisis, mejora o seguridad de los Servicios.
        <h1 className="text-xl font-light">2. Datos que Recopilamos</h1>
        Podemos recopilar y tratar, de manera enunciativa y no limitativa: 1.
        Datos de registro: nombre, apellidos, correo electrónico, contraseña,
        fecha de nacimiento, sexo, peso, altura, preferencias alimenticias,
        condiciones médicas declaradas, objetivos de salud. 2. Datos técnicos:
        dirección IP, identificadores de dispositivo, sistema operativo,
        navegador, datos de geolocalización aproximada, registros de actividad
        (“logs”). 3. Datos de uso: interacciones con la plataforma, historial de
        planes generados, cambios de configuración, métricas de rendimiento. 4.
        Datos de comunicación: correos, mensajes, solicitudes de soporte o
        encuestas completadas.
        <h1 className="text-xl font-light">3. Finalidades del Tratamiento</h1>
        El Tratamiento de Datos Personales se realizará para: • Proporcionar,
        mantener y mejorar los Servicios. • Personalizar planes alimenticios y
        recomendaciones. • Realizar análisis estadísticos, métricas de uso y
        optimización de la experiencia de usuario. • Detectar, prevenir y
        mitigar actividades fraudulentas, ilegales o no autorizadas. • Cumplir
        con obligaciones legales, regulatorias o contractuales.
        <h1 className="text-xl font-light">4. Base Legal del Tratamiento</h1>
        Procesamos sus Datos Personales sobre la base de: • Ejecución de
        contrato: prestación de los Servicios solicitados. • Consentimiento:
        otorgado libremente por el Usuario al aceptar esta Política. • Interés
        legítimo: mejorar, proteger y optimizar los Servicios. • Cumplimiento
        legal: obligaciones impuestas por la legislación aplicable.
        <h1 className="text-xl font-light">
          5. Compartición y Transferencia de Datos
        </h1>
        Podremos compartir sus Datos Personales con: • Proveedores de servicios:
        hosting, almacenamiento en la nube, analítica, seguridad, mensajería,
        pasarelas de pago. • Socios comerciales: únicamente en la medida
        necesaria para ejecutar funciones específicas relacionadas con los
        Servicios. • Autoridades competentes: cuando sea requerido por ley,
        orden judicial o proceso legal. En caso de transferencias
        internacionales, garantizamos que se implementarán mecanismos adecuados
        (cláusulas contractuales estándar, certificaciones o marcos de
        protección de datos) para salvaguardar sus datos.
        <h1 className="text-xl font-light">6. Retención de Datos</h1>
        Los Datos Personales serán conservados únicamente durante el tiempo
        necesario para cumplir las finalidades descritas o mientras exista una
        relación contractual activa con el Usuario. Una vez finalizado el plazo,
        serán eliminados o anonimizados de forma segura, salvo que la ley exija
        su conservación.
        <h1 className="text-xl font-light">7. Seguridad de la Información</h1>
        Implementamos medidas técnicas, organizativas y administrativas
        razonables para proteger los Datos Personales contra pérdida, acceso no
        autorizado, alteración, divulgación o destrucción. No obstante, el
        Usuario reconoce que ningún sistema es completamente infalible y que la
        Compañía no garantiza la seguridad absoluta de la información
        transmitida o almacenada.
        <h1 className="text-xl font-light">
          8. Exención y Limitación de Responsabilidad
        </h1>
        En la máxima medida permitida por la ley: • La Compañía no será
        responsable de accesos no autorizados, filtraciones, alteraciones o
        pérdidas de datos ocasionadas por fallos técnicos, ataques informáticos,
        negligencia del Usuario o fuerza mayor. • El Usuario es únicamente
        responsable de mantener la confidencialidad de sus credenciales de
        acceso y de cualquier actividad realizada bajo su cuenta.
        <h1 className="text-xl font-light">9. Derechos del Usuario</h1>
        Dependiendo de la jurisdicción, el Usuario puede tener derechos como: •
        Acceso, rectificación, supresión, oposición, limitación del tratamiento
        y portabilidad de sus Datos Personales. • Retiro del consentimiento en
        cualquier momento (sin efectos retroactivos). Las solicitudes deberán
        enviarse por escrito a [correo de contacto], acompañadas de la
        documentación que acredite la identidad del solicitante.
        <h1 className="text-xl font-light">10. Modificaciones a la Política</h1>
        Podemos actualizar esta Política en cualquier momento y sin previo
        aviso. La versión vigente estará disponible en la plataforma. El uso
        continuado de los Servicios tras la publicación de cambios constituirá
        aceptación de los mismos.
        <h1 className="text-xl font-light">
          11. Legislación Aplicable y Jurisdicción
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
