import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HeroUIProvider, Card, CardBody, Button } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import { FaLaptop } from 'react-icons/fa';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import EquipmentPage from './components/EquipmentPage';
import ContactPage from './components/ContactPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlobalDraggableChat from './components/GlobalDraggableChat';
import { ChatProvider } from './contexts/ChatContext';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Home Page Component
const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Services />
    
    {/* Otros Servicios */}
    <section className="py-16 bg-content2">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Descubre mis otros servicios
          </h2>
          
          <Card className="bg-content1 hover:shadow-lg transition-shadow duration-300">
            <CardBody className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="bg-orange-500 p-6 rounded-full">
                  <FaLaptop className="text-white text-4xl" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Desarrollo Full Stack
                  </h3>
                  <p className="text-default-600 text-lg mb-6">
                    Además de los servicios de drones, también me dedico al desarrollo web y aplicaciones. 
                    Descubre mi portfolio de proyectos tecnológicos.
                  </p>
                  <a 
                    href="https://carlosfr.es" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button 
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3"
                    >
                      VER PORTFOLIO
                    </Button>
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
    
    <Contact />

  </main>
);

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <HeroUIProvider>
        <ChatProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/servicios" element={<ServicesPage />} />
                <Route path="/quien-soy" element={<AboutPage />} />
                <Route path="/mi-equipo" element={<EquipmentPage />} />
                <Route path="/contacto" element={<ContactPage />} />
              </Routes>
              <Footer />
              <GlobalDraggableChat />
            </div>
          </Router>
        </ChatProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
}

export default App;