import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Componente del dron animado
const AnimatedDrone = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trayectoria para PC (amplia)
  const flightPathDesktop = [
    { x: 0, y: 0, rotation: 0 },
    { x: 150, y: -50, rotation: 15 },
    { x: 300, y: -80, rotation: 45 },
    { x: 450, y: -30, rotation: -30 },
    { x: 500, y: 50, rotation: 90 },
    { x: 400, y: 120, rotation: 180 },
    { x: 250, y: 150, rotation: -45 },
    { x: 100, y: 100, rotation: -90 },
    { x: 50, y: 20, rotation: 360 },
    { x: 200, y: -100, rotation: 720 },
    { x: 350, y: -120, rotation: 450 },
    { x: 480, y: -60, rotation: 180 },
    { x: 520, y: 80, rotation: -180 },
    { x: 300, y: 180, rotation: 270 },
    { x: 80, y: 140, rotation: -270 },
    { x: 0, y: 0, rotation: 0 }
  ];

  // Trayectoria para móvil (compacta, alrededor del PNG)
  const flightPathMobile = [
    { x: 0, y: 0, rotation: 0 },
    { x: 60, y: -40, rotation: 45 },
    { x: 80, y: -20, rotation: 90 },
    { x: 100, y: 20, rotation: 135 },
    { x: 80, y: 60, rotation: 180 },
    { x: 40, y: 80, rotation: 225 },
    { x: -20, y: 60, rotation: 270 },
    { x: -40, y: 20, rotation: 315 },
    { x: -20, y: -20, rotation: 360 },
    { x: 20, y: -60, rotation: 45 },
    { x: 60, y: -40, rotation: 90 },
    { x: 80, y: 0, rotation: 135 },
    { x: 60, y: 40, rotation: 180 },
    { x: 20, y: 60, rotation: 225 },
    { x: -20, y: 40, rotation: 270 },
    { x: 0, y: 0, rotation: 0 }
  ];

  const flightPath = isMobile ? flightPathMobile : flightPathDesktop;

  useEffect(() => {
    const animateFlight = () => {
      setIsAnimating(true);
      setCurrentStep(0);
      
      const stepDuration = 1800; // 1.8 segundos por paso
      
      const animateStep = (step: number) => {
        if (step < flightPath.length) {
          setCurrentStep(step);
          setRotation(flightPath[step].rotation);
          
          setTimeout(() => {
            animateStep(step + 1);
          }, stepDuration);
        } else {
          setIsAnimating(false);
          setCurrentStep(0);
          setRotation(0);
        }
      };
      
      animateStep(0);
    };

    // Iniciar inmediatamente la primera animación
    const initialTimeout = setTimeout(animateFlight, 1000);
    
    // Luego repetir cada 30 segundos
    const interval = setInterval(animateFlight, 30000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [flightPath]);

  const currentPosition = flightPath[currentStep] || { x: 0, y: 0, rotation: 0 };

  return (
    <div 
      className={`absolute ${isMobile ? 'top-8 right-8' : 'top-16 right-16'} transition-all duration-1800 ease-in-out z-10 ${
        isAnimating ? 'opacity-100' : 'opacity-70'
      }`}
      style={{
        transform: `translate(${currentPosition.x}px, ${currentPosition.y}px) rotate(${rotation}deg)`,
        transition: isAnimating ? 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'all 0.5s ease-out'
      }}
    >
      <svg
        width={isMobile ? "30" : "40"}
        height={isMobile ? "30" : "40"}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Cuerpo principal del dron */}
        <rect x="35" y="40" width="30" height="20" rx="4" fill="#f97316" />
        
        {/* Brazos del dron */}
        <rect x="15" y="47" width="20" height="6" rx="3" fill="#ea580c" />
        <rect x="65" y="47" width="20" height="6" rx="3" fill="#ea580c" />
        <rect x="47" y="15" width="6" height="20" rx="3" fill="#ea580c" />
        <rect x="47" y="65" width="6" height="20" rx="3" fill="#ea580c" />
        
        {/* Motores en las puntas */}
        <circle cx="25" cy="25" r="6" fill="#dc2626" />
        <circle cx="75" cy="25" r="6" fill="#dc2626" />
        <circle cx="25" cy="75" r="6" fill="#dc2626" />
        <circle cx="75" cy="75" r="6" fill="#dc2626" />
        
        {/* Centro/cámara */}
        <circle cx="50" cy="50" r="8" fill="#1f2937" />
        <circle cx="50" cy="50" r="4" fill="#3b82f6" opacity="0.8" />
        
        {/* LED indicador */}
        <circle cx="50" cy="35" r="2" fill="#10b981" className={isAnimating ? 'animate-pulse' : ''} />
        
        {/* Flecha direccional */}
        <polygon points="50,25 55,35 45,35" fill="#fbbf24" />
      </svg>
    </div>
  );
};

const skills = [
  { name: "Pilotaje FPV", percentage: 95 },
  { name: "Edición de Video", percentage: 90 },
  { name: "Fotografía", percentage: 85 }
];

const testimonials = [
  {
    text: "El video promocional que Carlos creó para nuestro colegio ha sido un éxito total. Su profesionalidad y creatividad son excepcionales.",
    author: "María Sánchez",
    position: "Directora de Colegio",
    date: "17 septiembre 2024"
  },
  {
    text: "Increíble trabajo capturando nuestra boda desde el aire. Las tomas son espectaculares y el resultado final superó todas nuestras expectativas.",
    author: "Ana y Miguel",
    position: "Pareja recién casada",
    date: "15 agosto 2024"
  },
  {
    text: "Profesional, puntual y con una calidad excepcional. Carlos transformó la promoción de nuestra villa con sus videos aéreos.",
    author: "Roberto García",
    position: "Agente Inmobiliario",
    date: "22 julio 2024"
  }
];

const AboutPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState(skills.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills.map(skill => skill.percentage));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-content1 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Freire FPV</h1>
          <p className="text-lg md:text-xl text-default-600 max-w-3xl mx-auto">
            Conóceme y descubre mi pasión por los drones FPV
          </p>
        </div>
      </section>

      {/* About Carlos Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-500">Carlos Pastor Freire</h2>
              <p className="text-lg text-orange-400 mb-6">Piloto de drones FPV & Fotógrafo</p>
              
              <div className="space-y-4 text-default-700 leading-relaxed">
                <p>
                  Hola, soy Carlos Pastor Freire, un malagueño de 28 años apasionado 
                  por la fotografía y los drones FPV. Desde Málaga Capital, recorro la 
                  Costa del Sol capturando perspectivas únicas con un estilo dinámico 
                  y creativo.
                </p>
                
                <p>
                  Mi aventura comenzó hace muchos años en simulador y desde hace 
                  3 en la vida real. Desde entonces me he especializado en el pilotaje 
                  FPV (First Person View), que me permite maniobrar y tomas imposibles 
                  con drones comerciales.
                </p>
                
                <p>
                  Mi misión es ofrecer grabaciones aéreas que sorprendan y 
                  emocionen. Combino mi conocimiento técnico con una visión 
                  artística para entregar contenido de alta calidad que supere las 
                  expectativas de mis clientes.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="/images/carlos-piloto-fpv.png"
                  alt="Carlos Pastor Freire - Piloto FPV"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Mis Habilidades</h3>
            
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div key={index} className="">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{skill.name}</span>
                    <span className="text-orange-500 font-bold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-2000 ease-out"
                      style={{ width: `${animatedSkills[index]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
       <section className="py-16">
         <div className="container mx-auto px-4 text-center">
           <div className="max-w-2xl mx-auto relative">
             <img
                src="/images/yoiso.png"
                alt="Carlos Pastor Freire"
                className="w-full h-auto"
              />
             <AnimatedDrone />
           </div>
         </div>
       </section>

      {/* Equipment Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">¿Quieres conocer mi equipo profesional?</h3>
          <p className="text-lg text-default-600 mb-8 max-w-2xl mx-auto">
            Descubre los drones, cámaras y herramientas que utilizo para crear 
            contenido audiovisual de alta calidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mi-equipo">
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3"
              >
                VER MI EQUIPAMIENTO
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3"
              >
                VER PORTFOLIO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Lo que dicen mis clientes</h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Card className="bg-default-100 border-none shadow-lg">
                <CardBody className="p-8 text-center">
                  <div className="mb-6">
                    <Icon icon="lucide:quote" className="text-orange-500 mx-auto mb-4" width={48} height={48} />
                    <p className="text-lg md:text-xl text-default-700 leading-relaxed italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                  </div>
                  
                  <div className="border-t border-default-300 pt-6">
                    <h4 className="text-xl font-bold text-orange-500 mb-1">
                      {testimonials[currentTestimonial].author}
                    </h4>
                    <p className="text-default-600 mb-2">
                      {testimonials[currentTestimonial].position}
                    </p>
                    <p className="text-sm text-default-500">
                      {testimonials[currentTestimonial].date}
                    </p>
                  </div>
                </CardBody>
              </Card>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              >
                <Icon icon="lucide:chevron-left" width={24} height={24} />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              >
                <Icon icon="lucide:chevron-right" width={24} height={24} />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-orange-500' : 'bg-default-300'
                  }`}
                />
              ))}
            </div>
            
            {/* Add Opinion Button */}
            <div className="text-center mt-8">
              <Button 
                variant="bordered"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <Icon icon="lucide:plus" className="mr-2" width={20} height={20} />
                Añadir mi opinión
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Cómo puedo ayudarte a capturar tu historia desde una nueva perspectiva?
          </h3>
          <Button 
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-3 text-lg mt-6"
          >
            CONTACTAME AHORA
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;