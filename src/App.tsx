import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
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
            </Routes>
            <Footer />
          </div>
        </Router>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}

export default App;