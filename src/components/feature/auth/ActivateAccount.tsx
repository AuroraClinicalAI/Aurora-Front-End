import PhoneCheck from "@assets/images/phone_check.svg"

export const ActivateAccount = () => {
  return (
    <div className="max-w-[473px] xl:h-[502px] rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center px-10 pt-8 gap-5 mx-auto">
      <h3 className="text-center justify-center text-black text-3xl font-bold">Activa tu cuenta</h3>
      <p className="text-slate-500 text-sm font-bold">¡Te damos la bienvenida a AURORA!</p>
      <p className="text-slate-500 text-sm font-normal">En estos momentos te estamos redirigiendo a la pagina principal.</p>
      <p className="text-black text-[10px] font-normal">Si no se te ha redireccionado a la pagina de inicio haz <a href="/" className="text-sky-300 text-[10px] font-bold">CLICK AQUÍ</a></p>
      <img src={PhoneCheck} alt="account created illustration"  className="w-64 h-64"/>
    </div>
  );
}
