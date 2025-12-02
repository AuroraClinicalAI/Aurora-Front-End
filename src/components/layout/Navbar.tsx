import type { UserState } from '@/types/AuthType';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Avatar, AvatarImage, AvatarFallback, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuItem } from '@components/ui';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className='w-full bg-indigo-300'>
      <nav data-state="OnlyRegister" className="navbar h-20 relative bg-indigo-300 flex justify-between p-0 md:p-5 items-center flex-wrap max-w-[1600px] mx-auto">
        <a className="text-white text-3xl font-bold my-5 ml-5 md:m-0" href='/'>AURORA</a>
        {/* Menú de navegación */}
        <div className='flex gap-5'>
          <div className={`hidden w-full md:flex md:w-auto items-center`} id="navbar-default" >
            {userState.usuario === null ?
              <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-indigo-300 gap-5">
                <li>
                  <Button variant={"default"} size={"xl"} onClick={() => navigate("/login")}>Iniciar Sesión</Button>
                </li>
                <li>
                  <Button variant={"secondary"} size={"xl"} onClick={() => navigate("/register")}>Registrarse</Button>
                </li>
              </ul>
              :
              <ul className={`font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ${isMenuOpen ? `dark:bg-indigo-300 md:dark:bg-indigo-300` : ``} gap-5 `}>
                <li>
                  <Button variant={"default"} size={"xl"} onClick={() => navigate("/library")}>Recursos</Button>
                </li>
                <li>
                  <Button variant={"secondary"} size={"xl"} onClick={() => navigate("/about")}>Acerca De</Button>
                </li>
              </ul>
            }
          </div>
          <div className='flex gap-3'>
            {userState.usuario != null &&
              <div className="flex items-center md:order-2 md:space-x-0 rtl:space-x-reverse">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={`${apiUrl}${userState.usuario.imagen}`}/>
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <DropdownMenuContent className='z-50 my-4 p-1 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute translate-x-[-7rem] md:translate-x-[-10rem] max-w-[250px]' align='start'>
                      <DropdownMenuLabel>
                        <span className="block text-sm text-gray-900 dark:text-white">{userState.usuario.nombre_usuario}</span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userState.usuario.correo}</span>
                      </DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                          Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/logout")}>
                          Cerrar Sessión
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </div>
            }
            {/* Botón de navegación */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 my-5 mr-5 md:m-0"
              aria-expanded={isMenuOpen} // Se actualiza dinámicamente
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`
        ${isMenuOpen ? '' : 'hidden'}
            w-full md:hidden md:w-auto`}
          id="navbar-default"
        >
          {userState.usuario == null ?
            <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-indigo-300 dark:bg-indigo-300 md:dark:bg-indigo-300 gap-2 ">
              <li>
                <Button variant={"default"} size={"xl"} onClick={() => navigate("/login")}>Iniciar Sesión</Button>
              </li>
              <li>
                <Button variant={"secondary"} size={"xl"} onClick={() => navigate("/register")}>Registrarse</Button>
              </li>
            </ul>
            :
            <ul className={`font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-indigo-300 dark:bg-indigo-300 md:dark:bg-indigo-300 gap-2 `}>
                <li>
                  <Button variant={"default"} size={"xl"} onClick={() => navigate("/library")}>Recursos</Button>
                </li>
                <li>
                  <Button variant={"secondary"} size={"xl"} onClick={() => navigate("/about")}>Acerca De</Button>
                </li>
            </ul>
          }
        </div>
      </nav>
    </header>
  );
}
