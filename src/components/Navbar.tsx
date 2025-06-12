import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const NavbarComponent = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">Freire FPV</p>
        </NavbarBrand>
        
        {/* Desktop Menu */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#" className="text-sm font-medium">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#servicios" className="text-sm font-medium">
              Servicios
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#quien-soy" className="text-sm font-medium">
              Quien soy
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#mi-equipo" className="text-sm font-medium">
              Mi equipo
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#contacto" className="text-sm font-medium">
              Contacto
            </Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent justify="end">
          {/* Theme Toggle - Desktop */}
          <NavbarItem className="hidden sm:flex">
            <Button
              isIconOnly
              variant="light"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Icon icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'} width={24} height={24} />
            </Button>
          </NavbarItem>
          
          {/* Mobile Hamburger Menu */}
          <NavbarItem className="sm:hidden">
            <Button
              isIconOnly
              variant="light"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <div className="flex flex-col justify-center items-center w-6 h-6">
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}></span>
              </div>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden fixed top-16 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              color="foreground" 
              href="#" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              color="foreground" 
              href="#servicios" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              color="foreground" 
              href="#quien-soy" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quien soy
            </Link>
            <Link 
              color="foreground" 
              href="#mi-equipo" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mi equipo
            </Link>
            <Link 
              color="foreground" 
              href="#contacto" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            
            {/* Theme Toggle - Mobile */}
            <div className="pt-4 border-t border-gray-600">
              <Button
                variant="light"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-white hover:text-orange-500 transition-colors"
              >
                <Icon icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'} width={24} height={24} />
                <span className="ml-2">{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Logo = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32">
    <circle cx="8" cy="8" r="6" fill="#FF6600" />
    <circle cx="24" cy="8" r="6" fill="#FF6600" />
    <circle cx="8" cy="24" r="6" fill="#FF6600" />
    <circle cx="24" cy="24" r="6" fill="#FF6600" />
  </svg>
);

export default NavbarComponent;