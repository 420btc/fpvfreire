import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@heroui/react';
import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NavbarComponent = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <Logo />
          <RouterLink to="/" className="font-bold text-inherit font-sonsie ml-4 hover:text-orange-500 transition-colors">
            Freire FPV
          </RouterLink>
        </NavbarBrand>
        
        {/* Desktop Menu */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <RouterLink to="/" className="text-sm font-medium text-foreground hover:text-orange-500 transition-colors">
              Inicio
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink to="/servicios" className="text-sm font-medium text-foreground hover:text-orange-500 transition-colors">
              Servicios
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink to="/quien-soy" className="text-sm font-medium text-foreground hover:text-orange-500 transition-colors">
              Quien soy
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink to="/mi-equipo" className="text-sm font-medium text-foreground hover:text-orange-500 transition-colors">
              Mi Equipo
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink to="/contacto" className="text-sm font-medium text-foreground hover:text-orange-500 transition-colors">
              Contacto
            </RouterLink>
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
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
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
            <RouterLink 
              to="/" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </RouterLink>
            <RouterLink 
              to="/servicios" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </RouterLink>
            <RouterLink 
              to="/quien-soy" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quien soy
            </RouterLink>
            <RouterLink 
              to="/mi-equipo" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mi Equipo
            </RouterLink>
            <RouterLink 
              to="/contacto" 
              className="text-white text-lg font-medium py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </RouterLink>
            
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

const Logo = () => {
  const [isReversed, setIsReversed] = useState(false);

  return (
    <svg 
      className={`w-8 h-8 transition-transform duration-300 ${
        isReversed ? 'animate-spin-reverse' : 'animate-spin'
      }`}
      viewBox="0 0 32 32"
      onMouseEnter={() => setIsReversed(true)}
      onMouseLeave={() => setIsReversed(false)}
      onClick={() => setIsReversed(!isReversed)}
      style={{
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
      }}
    >
      <circle cx="8" cy="8" r="6" fill="#FF6600" />
      <circle cx="24" cy="8" r="6" fill="#FF6600" />
      <circle cx="8" cy="24" r="6" fill="#FF6600" />
      <circle cx="24" cy="24" r="6" fill="#FF6600" />
    </svg>
  );
};

export default NavbarComponent;