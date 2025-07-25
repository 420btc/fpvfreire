import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // Empezar con gifs
  const [gifCycleComplete, setGifCycleComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Lista de gifs disponibles
  const gifs = [
    "/gifs/gif2.gif",
    "/gifs/gif4.gif",
    "/gifs/gif3.gif"
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video && showVideo) {
      const handleVideoEnd = () => {
        // Después del video, reiniciar el ciclo de gifs
        setShowVideo(false);
        setGifCycleComplete(false);
        setCurrentMedia(0);
      };

      video.addEventListener('ended', handleVideoEnd);
      return () => video.removeEventListener('ended', handleVideoEnd);
    }
  }, [showVideo]);

  useEffect(() => {
    if (!showVideo && !gifCycleComplete && gifs.length > 0) {
      const img = new Image();
      img.src = gifs[currentMedia];
      
      const handleGifLoad = () => {
        // Esperar a que el gif termine de reproducirse (estimado 2-3 segundos)
        setTimeout(() => {
          const nextIndex = currentMedia + 1;
          if (nextIndex >= gifs.length) {
            setGifCycleComplete(true);
            setShowVideo(true);
          } else {
            setCurrentMedia(nextIndex);
          }
        }, 2500); // Tiempo estimado para que termine el gif
      };

      img.addEventListener('load', handleGifLoad);
      return () => img.removeEventListener('load', handleGifLoad);
    }
  }, [showVideo, gifs.length, gifCycleComplete, currentMedia]);

  return (
    <div className="relative h-screen flex flex-col">
      {showVideo ? (
        <>
          <div className="relative flex-1 overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              controls={false}
            >
              <source src="/videos/drone-intro.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex flex-col items-center justify-center text-white">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 font-sonsie text-white dark:text-gray-100">Freire FPV</h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white dark:text-gray-200">Grabaciones aéreas únicas desde Málaga</p>
              <Link to="/servicios">
                <Button 
                  color="primary" 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Descubrir Servicios
                </Button>
              </Link>
            </div>
          </div>

        </>
      ) : (
        <div className="relative h-full overflow-hidden">
          <img
            src={gifs[currentMedia]}
            alt="FPV Animation"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 font-sonsie text-white dark:text-gray-100">Freire FPV</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white dark:text-gray-200">Grabaciones aéreas únicas desde Málaga</p>
            <Link to="/servicios">
              <Button 
                color="primary" 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
              >
                Descubrir Servicios
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;