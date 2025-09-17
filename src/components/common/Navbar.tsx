import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header>
      <nav data-state="OnlyRegister" className="navbar h-20 relative bg-indigo-300 flex justify-between p-0 md:p-5 items-center flex-wrap">
        <a className="text-white text-3xl font-bold my-5 ml-5 md:m-0" href='/'>AURORA</a>
        {/* Botón de navegación */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 my-5 mr-5 md:m-0"
          aria-expanded={isMenuOpen} // Se actualiza dinámicamente
        >
          <span className="sr-only">Abrir menú</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        {/* Menú de navegación */}
        <div 
          className={`
            ${isMenuOpen ? 'block' : 'hidden'} 
            w-full md:block md:w-auto
          `} 
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-indigo-300 md:dark:bg-indigo-300 gap-5 ">
            <li>
              <a 
                href="/login" 
                className="rounded-lg md:bg-accent-1 p-2.5 text-white text-xl font-bold md:shadow-[2px_2px_0px_0px_rgba(139,117,226,1.00)] bg-transparent shadow-transparent hover:bg-indigo-400"
              >
                Iniciar Sesión
              </a>
            </li>
            <li>
              <a 
                href="/register" 
                className="rounded-lg md:bg-neutral p-2.5 text-white text-xl font-bold md:shadow-[2px_2px_0px_0px_rgba(117,203,226,1.00)] bg-transparent shadow-transparent hover:bg-indigo-400 md:hover:bg-neutral"
              >
                Registrarse
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
