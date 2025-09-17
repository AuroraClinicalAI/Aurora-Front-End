import Button from "@components/common/Button";

export const RegisterForm = () => {
  return (
    <div className="max-w-[473px] w-full rounded-[5px] outline-2 outline-offset-[-2px] outline-zinc-800/20 flex flex-col items-center px-10 pt-8 pb-4 gap-10 mx-auto my-30">
      <div>
        <h3 className="justify-center text-black text-3xl font-bold mb-1 text-center">Registro de Usuario</h3>
        <p className="justify-center text-slate-500 text-sm font-normal text-center">Ingresa tus datos para crear una cuenta</p>
      </div>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-black text-sm font-semibold ">NOMBRE</label>
          <input type="text" name="nombre" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1 self-stretch" placeholder="Cual es tu nombre?"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-black text-sm font-semibold ">CORREO ELECTRÓNICO</label>
          <input type="text" name="email" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1" placeholder="tu@ejemplo.com"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="nombreUsuario" className="text-black text-sm font-semibold ">NOMBRE DE USUARIO</label>
          <input type="text" name="nombreUsuario" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1" placeholder="Usuario123"/>
          <p>Este sera tu identificador único en el sistema</p>
        </div>
        <Button label="Verificar nombre de usuario" type="register" onClick={() => {}}/>
        <div className="flex flex-col">
          <label htmlFor="tipoUsuario" className="text-black text-sm font-semibold ">TIPO DE USUARIO</label>
          <input type="text" name="tipoUsuario" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1" placeholder="Selecciona una opción"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="clave" className="text-black text-sm font-semibold ">CONTRASEÑA</label>
          <input type="password" name="clave" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmarClave" className="text-black text-sm font-semibold ">CONFIRMAR CONTRASEÑA</label>
          <input type="password" name="confirmarClave" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************"/>
          <a href="/forgot-password" className="text-slate-500 text-xs font-normal">Olvide mi contraseña</a>
        </div>
        <div className="mx-auto">
        <Button label="Iniciar Sesión" type="register" onClick={() => {}}/>
        </div>
      </form>
    </div>
  );
}