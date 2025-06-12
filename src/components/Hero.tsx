import { Button } from "@heroui/react";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Lista de gifs disponibles
  const gifs = [
    "/gifs/4d7~mv2.gif",
    "/gifs/f-mv2.gif"
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        setShowVideo(false);
        // Iniciar ciclo de gifs
        setCurrentMedia(0);
      };

      video.addEventListener('ended', handleVideoEnd);
      return () => video.removeEventListener('ended', handleVideoEnd);
    }
  }, []);

  useEffect(() => {
    if (!showVideo && gifs.length > 0) {
      const interval = setInterval(() => {
        setCurrentMedia((prev) => (prev + 1) % gifs.length);
      }, 3000); // Cambiar gif cada 3 segundos

      return () => clearInterval(interval);
    }
  }, [showVideo, gifs.length]);

  return (
    <div className="relative h-screen">
      {showVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src="/videos/drone-intro.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src={gifs[currentMedia]}
          alt="FPV Animation"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 font-sonsie text-white dark:text-gray-100">Freire FPV</h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white dark:text-gray-200">Grabaciones aéreas únicas desde Málaga</p>
        <Button 
          color="primary" 
          size="lg" 
          href="#servicios"
          className="font-semibold tracking-wide text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          Descubrir Servicios
        </Button>
      </div>
    </div>
  );
};

export default Hero;