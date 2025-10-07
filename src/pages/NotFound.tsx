import NotFoundIllustration from "@assets/images/not_found.svg"
import Button from "@components/common/Button";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center md:my-auto gap-20 my-30 mx-5">
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-black text-6xl md:text-7xl font-bold">Error 404</h2>
        <p className="text-center text-xl md:text-2xl max-w-[600px] text-gray-400">Ups, Parece que hubo un error de cálculo. <br/>
          La página a la que estás intentando acceder no existe.</p>
        <div>
          <Button label="Volver al Inicio" onClick={() => {}} type="register"/>
        </div>
      </div>
      <img src={NotFoundIllustration} alt="Ilustracion principal" className="w-[300px] md:w-[400px]"/>
    </div>
  );
}