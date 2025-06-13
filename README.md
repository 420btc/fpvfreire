# 🚁 Freire FPV - Servicios de Drones FPV Profesionales

<div align="center">
  <img src="public/images/carlos-piloto-fpv.png" alt="Carlos Pastor Freire - Piloto FPV" width="200" height="200" style="border-radius: 50%;">
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## 🎯 Sobre el Proyecto

**Freire FPV** es la página web oficial de **Carlos Pastor Freire**, piloto profesional de drones FPV especializado en servicios de grabación aérea en la Costa del Sol. Esta plataforma moderna y responsive presenta los servicios profesionales de fotografía y videografía aérea con drones FPV (First Person View).

### 🌟 Características Principales

- 🎥 **Galería de Videos Interactiva** - Reproductor con navegación entre proyectos
- 🤖 **Chatbot Inteligente** - Asistente AI especializado en drones FPV
- 📱 **Diseño Responsive** - Optimizado para todos los dispositivos
- 🎨 **UI Moderna** - Interfaz elegante con HeroUI y Tailwind CSS
- 🗺️ **Mapa Interactivo** - Integración con Mapbox para ubicación
- 📧 **Formulario de Contacto** - Integrado con EmailJS
- ⚡ **Rendimiento Optimizado** - Construido con Vite para máxima velocidad
- 🌙 **Modo Oscuro/Claro** - Tema adaptable con next-themes

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.2.2** - Tipado estático para JavaScript
- **Vite 5.0.8** - Herramienta de construcción ultrarrápida

### Styling & UI
- **Tailwind CSS 3.4.1** - Framework de CSS utilitario
- **HeroUI 2.7.9** - Biblioteca de componentes React moderna
- **Framer Motion 11.0.3** - Animaciones fluidas
- **React Icons 5.5.0** - Iconografía completa
- **Heroicons 2.2.0** - Iconos SVG de alta calidad

### Funcionalidades
- **React Router DOM 7.6.2** - Navegación SPA
- **Mapbox GL 3.12.0** - Mapas interactivos
- **EmailJS 3.2.0** - Envío de emails desde el frontend
- **Next Themes 0.2.1** - Gestión de temas
- **Vercel Analytics 1.5.0** - Analíticas web

### Desarrollo
- **ESLint** - Linting de código
- **Babel** - Transpilación de JavaScript
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/freire-fpv.git

# Navegar al directorio
cd freire-fpv

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves API
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_OPENAI_API_KEY=tu_clave_openai_aqui
VITE_MAPBOX_TOKEN=tu_token_mapbox_aqui
VITE_EMAILJS_SERVICE_ID=tu_service_id_emailjs
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_emailjs
VITE_EMAILJS_USER_ID=tu_user_id_emailjs
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
freire-fpv/
├── 📁 public/
│   ├── 📁 images/          # Imágenes estáticas
│   ├── 📁 videos/          # Videos de proyectos
│   └── 📁 gifs/            # GIFs animados
├── 📁 src/
│   ├── 📁 components/      # Componentes React
│   │   ├── Hero.tsx        # Sección principal
│   │   ├── About.tsx       # Reproductor de videos
│   │   ├── Services.tsx    # Servicios ofrecidos
│   │   ├── Contact.tsx     # Formulario de contacto
│   │   └── GlobalDraggableChat.tsx # Chatbot AI
│   ├── 📁 contexts/        # Contextos React
│   └── 📁 pages/           # Páginas de la aplicación
├── 📄 package.json         # Dependencias y scripts
├── 📄 tailwind.config.js   # Configuración Tailwind
├── 📄 vite.config.ts       # Configuración Vite
└── 📄 tsconfig.json        # Configuración TypeScript
```

## 🎨 Servicios Destacados

### 🏠 Inmobiliario
- Casas y villas de lujo
- Tours virtuales aéreos
- Fotografía arquitectónica

### 🎉 Eventos
- Bodas y celebraciones
- Eventos corporativos
- Deportes y competiciones

### 🏢 Comercial
- Inspecciones técnicas
- Publicidad y marketing
- Documentales y naturaleza

## 🤖 Chatbot Inteligente

El sitio incluye un chatbot especializado en drones FPV que puede:
- ✅ Responder preguntas sobre servicios
- ✅ Proporcionar información técnica
- ✅ Ayudar con presupuestos
- ✅ Explicar regulaciones de vuelo
- ✅ Mostrar tiempo de respuesta en tiempo real

## 📱 Características Responsive

- 📱 **Mobile First** - Diseño optimizado para móviles
- 💻 **Desktop Enhanced** - Experiencia mejorada en escritorio
- 🖥️ **Tablet Friendly** - Adaptado para tablets
- ⚡ **Carga Rápida** - Optimizado para rendimiento

## 🌐 Despliegue

El proyecto está optimizado para despliegue en:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Cualquier hosting estático

### Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

## 👨‍💻 Autor

**Carlos Pastor Freire**
- 🚁 Piloto Profesional de Drones FPV
- 📍 Costa del Sol, España
- 📧 Contacto: [Formulario web](https://freirefpv.com/contacto)
- 📱 Instagram: [@cpf.pv](https://www.instagram.com/cpf.pv/)
- 🎥 YouTube: [@CarlosFreire](https://www.youtube.com/@CarlosFreire)
- 🐦 Twitter: [@CarlosFreire0](https://x.com/CarlosFreire0)

## 📄 Licencia

Este proyecto es propiedad de Carlos Pastor Freire - Freire FPV. Todos los derechos reservados.

---

<div align="center">
  <p>🚁 <strong>Capturando momentos desde el cielo</strong> 🚁</p>
  <p>Hecho con ❤️ y React en la Costa del Sol</p>
</div>

