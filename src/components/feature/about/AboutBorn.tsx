import AboutIllustration from "@assets/images/about_ilustration.svg";

export const AboutBorn = () => {
  return (
    <div className="container">
      <h2>Cómo Nació Nuestra Iniciativa?</h2>
      <p>
        Todo comenzó cuando nos dimos cuenta de una realidad preocupante: millones de personas sufren de depresión en silencio, sin acceso a herramientas de detección temprana o sin reconocer los síntomas iniciales. <br/>
        En 2023, un grupo de desarrolladores, psicólogos y especialistas en salud mental se unieron con una visión común: crear una plataforma accesible que pudiera ayudar a identificar signos tempranos de depresión utilizando tecnología de vanguardia. <br/>
        Después de meses de investigación, colaboración con profesionales de la salud mental y desarrollo iterativo, nació nuestro sistema de diagnóstico de depresión basado en inteligencia artificial.
      </p>
      <img src={AboutIllustration} alt="" />
    </div>
  );
}