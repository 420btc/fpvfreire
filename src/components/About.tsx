import { Card, CardBody, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const About = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showPortfolioOverlay, setShowPortfolioOverlay] = useState(false);
  
  const videos = [
    {
      src: "/videos/VillaAurora.mp4",
      title: "Villa Aurora"
    },
    {
      src: "/videos/VillaSunset.mp4",
      title: "Villa Sunset"
    },
    {
      src: "/videos/Casapaco.mp4",
      title: "Casa Paco"
    }
  ];

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  useEffect(() => {
    // Mostrar overlay cuando se llegue al tercer video (índice 2)
    setShowPortfolioOverlay(currentVideo === 2);
  }, [currentVideo]);

  return (
    <section className="py-16 bg-content2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Capturo momentos desde el cielo</h2>
            <p className="text-lg mb-4">
              Soy Carlos Pastor Freire, piloto de drones FPV y apasionado de la fotografía, 
              capturando momentos únicos en la Costa del Sol.
            </p>
            <p className="text-lg">
              Con mis drones FPV puedo ofrecer perspectivas únicas y dinámicas imposibles 
              de conseguir con drones convencionales o cámaras tradicionales.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Card className="w-full overflow-hidden relative">
              <CardBody className="p-0">
                <video
                  key={currentVideo}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    showPortfolioOverlay ? 'blur-sm' : ''
                  }`}
                  controls={!showPortfolioOverlay}
                  autoPlay
                  muted
                  loop
                >
                  <source src={videos[currentVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Overlay borroso para el tercer video */}
                {showPortfolioOverlay && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="text-center animate-pulse">
                      <Link to="/portfolio">
                        <Button
                          size="lg"
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                          VER PORTFOLIO
                        </Button>
                      </Link>
                      <p className="text-white mt-4 text-lg font-semibold">
                        Descubre más videos en nuestro portfolio
                      </p>
                    </div>
                  </div>
                )}

              </CardBody>
            </Card>
            {/* Controles de navegación debajo del video */}
            <div className={`flex justify-center mt-4 space-x-4 transition-all duration-500 ${
              showPortfolioOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
              <Button
                isIconOnly
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onPress={prevVideo}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              <Link to="/portfolio">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 md:px-12 md:py-4 md:text-lg md:min-w-[200px]"
                >
                  Ver Portfolio
                </Button>
              </Link>
              <Button
                isIconOnly
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onPress={nextVideo}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;