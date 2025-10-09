import type { UserState } from '@/types/AuthType';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userState = useSelector((state: { user: UserState }) => state.user);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  }
  return (
    <header className='w-full bg-indigo-300'>
      <nav data-state="OnlyRegister" className="navbar h-20 relative bg-indigo-300 flex justify-between p-0 md:p-5 items-center flex-wrap max-w-[1600px] mx-auto">
        <a className="text-white text-3xl font-bold my-5 ml-5 md:m-0" href='/'>AURORA</a>
        {/* Menú de navegación */}
        <div className='flex gap-5'>
          <div className={`hidden w-full md:flex md:w-auto items-center`} id="navbar-default" >
            {userState.user === null ?
              <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-indigo-300 md:dark:bg-indigo-300 gap-5 ">
                <li>
                  <a href="/login" className="rounded-lg md:bg-accent-1 p-2.5 text-white text-xl font-bold md:shadow-[2px_2px_0px_0px_rgba(139,117,226,1.00)] bg-transparent shadow-transparent hover:bg-indigo-400" >
                    Iniciar Sesión
                  </a>
                </li>
                <li>
                  <a href="/register" className="rounded-lg md:bg-neutral p-2.5 text-white text-xl font-bold md:shadow-[2px_2px_0px_0px_rgba(117,203,226,1.00)] bg-transparent shadow-transparent hover:bg-indigo-400 md:hover:bg-neutral" >
                    Registrarse
                  </a>
                </li>
              </ul>
              :
              <ul className={`font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ${isMenuOpen ? `md:bg-white dark:bg-indigo-300 md:dark:bg-indigo-300` : ``} gap-5 `}>
                <li>
                  <a href="/library" className="rounded-lg p-2.5 text-white text-xl font-bold hover:bg-indigo-400" >
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="/about" className="rounded-lg p-2.5 text-white text-xl font-bold hover:bg-indigo-400" >
                    Acerca De
                  </a>
                </li>
              </ul>
            }
          </div>
          <div className='flex gap-3'>
            {userState.user !== null &&
              <div className="flex items-center md:order-2 md:space-x-0 rtl:space-x-reverse">
                <button type="button" className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isUserMenuOpen} onClick={toggleUserMenu}>
                  <span className="sr-only">Open user menu</span>
                  <img className="w-10 h-10 rounded-full" src={`${apiUrl}${userState.user.imagen}`} alt="user photo" />
                </button>
                {isUserMenuOpen &&
                  <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute translate-y-32 translate-x-[-95px] md:translate-x-[-150px] max-w-[200px]">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">{userState.user.nombre_usuario}</span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userState.user.correo}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Perfil</a>
                      </li>
                      <li>
                        <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar Sesión</a>
                      </li>
                    </ul>
                  </div>
                }
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
          {userState.user === null ?
            <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-indigo-300 md:dark:bg-indigo-300 gap-2 ">
              <li>
                <a
                  href="/login"
                  className="block rounded-lg md:bg-accent-1 p-2.5 text-white text-xl font-bold md:shadow-[2px_2px_0px_0px_rgba(139,117,226,1.00)] bg-transparent shadow-transparent hover:bg-indigo-400"
                >
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="block rounded-lg md:bg-neutral p-2.5 text-white text-xl font-bold md:shadow-[2px_2px_0px_0px_rgba(117,203,226,1.00)] bg-transparent shadow-transparent hover:bg-indigo-400 md:hover:bg-neutral"
                >
                  Registrarse
                </a>
              </li>
            </ul>
            :
            <ul className={`font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ${isMenuOpen ? `md:bg-white dark:bg-indigo-300 md:dark:bg-indigo-300` : ``} gap-5 `}>
              <li>
                <a
                  href="/library"
                  className="block rounded-lg p-2.5 text-white text-xl font-bold hover:bg-indigo-400"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block rounded-lg p-2.5 text-white text-xl font-bold hover:bg-indigo-400"
                >
                  Acerca De
                </a>
              </li>
            </ul>
          }
        </div>
      </nav>
    </header>
  );
}
