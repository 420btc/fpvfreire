import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Home Page Component
const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Services />
    <Contact />
  </main>
);

function App() {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <HeroUIProvider>
        <Router>
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
          </div>
        </Router>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}

export default App;