import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';

const NavbarComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">Freire FPV</p>
      </NavbarBrand>
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
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Icon icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'} width={24} height={24} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
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