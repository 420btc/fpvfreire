import { Card, CardBody, Button } from "@heroui/react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const About = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  
  const videos = [
    {
      src: "/videos/VillaAurora.mp4",
      title: "Villa Aurora"
    },
    {
      src: "/videos/villa_sunset.mp4",
      title: "Villa Sunset"
    }
  ];

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

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
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src={videos[currentVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Botones de navegación */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    isIconOnly
                    className="ml-2 bg-orange-500 hover:bg-orange-600 text-white"
                    onPress={prevVideo}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    isIconOnly
                    className="mr-2 bg-orange-500 hover:bg-orange-600 text-white"
                    onPress={nextVideo}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentVideo ? 'bg-orange-500' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentVideo(index)}
                    />
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;