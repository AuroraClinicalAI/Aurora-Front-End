import Button from "@components/common/Button";

export const LoginForm = () => {
  return (
    <div className="max-w-[473px] h-96 rounded-[5px] outline-2 outline-offset-[-2px] outline-zinc-800/20 flex flex-col items-center px-10 pt-8 gap-10 mx-auto">
      <div>
        <h3 className="justify-center text-black text-3xl font-bold mb-1 text-center">Inicio de Sesión</h3>
        <p className="justify-center text-slate-500 text-sm font-normal text-center">Ingresa tus datos para acceder a la Plataforma</p>
      </div>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col max-w-64">
          <label htmlFor="email" className="text-black text-sm font-semibold ">CORREO ELECTRÓNICO</label>
          <input type="text" name="email" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1" placeholder="tu@ejemplo.com"/>
        </div>
        <div className="flex flex-col max-w-64">
          <label htmlFor="clave" className="text-black text-sm font-semibold ">CONTRASEÑA</label>
          <input type="password" name="clave" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************"/>
          <a href="/forgot-password" className="text-slate-500 text-xs font-normal">Olvide mi contraseña</a>
        </div>
        <div className="mx-auto">
        <Button label="Iniciar Sesión" type="register" onClick={() => {}}/>
        </div>
      </form>
    </div>
  );
}