import { Card, CardBody } from "@heroui/react";
import { FaHome, FaGlassCheers, FaBuilding } from 'react-icons/fa';
import { useState } from 'react';

const PortfolioPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (videoSrc: string) => {
    // Check if we are on desktop (screen width >= 1024px)
    if (window.innerWidth >= 1024) {
      setSelectedVideo(videoSrc);
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Video Modal Overlay */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={closeVideoModal}
        >
          <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <iframe
              className="w-full h-full"
              src={`${selectedVideo}&autoplay=1`}
              title="Video Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            ></iframe>
            <button 
              onClick={closeVideoModal}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Portfolio de Videos
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Descubre nuestra colección de videos de casas y eventos capturados con drones FPV
          </p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="pt-6 pb-16">
        <div className="container mx-auto px-4 max-w-[1600px]">

          {/* Divider 2025 */}
          <div className="relative flex items-center pb-8 pt-2">
            <div className="flex-grow border-t border-orange-500"></div>
            <span className="flex-shrink-0 mx-4 text-2xl font-bold text-orange-500">2025</span>
            <div className="flex-grow border-t border-orange-500"></div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video 1 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/Wc61WUZAiFE?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/Wc61WUZAiFE?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Aurora"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Aurora
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 2 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/v3Stsgpk55g?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/v3Stsgpk55g?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Camelia"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Camelia
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 3 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/p5nh2fKd8kg?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/p5nh2fKd8kg?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Coto"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Coto
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 4 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/lfafRB6PlU8?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/lfafRB6PlU8?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa La Moraleda"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa La Moraleda
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 5 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/I4Vftp3-Gg8?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/I4Vftp3-Gg8?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Camelia 2"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Camelia 2
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 6 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/JLiyq1DJCHQ?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/JLiyq1DJCHQ?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Fiesta Santa Angelo"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaGlassCheers className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Fiesta Santa Angelo
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 7 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/bvauiim7yzw?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/bvauiim7yzw?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Cortijo Maza"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Cortijo Maza
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 8 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/TsNCYGurxDE?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/TsNCYGurxDE?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Verdolaga"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Verdolaga
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 9 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/pDamDdKDBdk?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/pDamDdKDBdk?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Colegio Maravillas"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaBuilding className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Colegio Maravillas
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 10 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/Ew-3-vLgOys?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/Ew-3-vLgOys?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Velázquez"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Velázquez
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 11 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/motZZkuDjf4?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/motZZkuDjf4?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Pradera"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Pradera
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Video 12 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/btwl4BI-0Xk?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/btwl4BI-0Xk?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Ebano"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Ebano
                   </h3>
                 </div>
               </CardBody>
            </Card>
          </div>

          {/* Divider 2025 - 2026 */}
          <div className="relative flex items-center py-12">
            <div className="flex-grow border-t border-orange-500"></div>
            <span className="flex-shrink-0 mx-4 text-2xl font-bold text-orange-500">2026</span>
            <div className="flex-grow border-t border-orange-500"></div>
          </div>

          {/* 2026 Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Villa Guadalmedina */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/kWE6aJHxnXI?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/kWE6aJHxnXI?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Guadalmedina"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Guadalmedina
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Villa Sunset */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/yNWXUJhGYNU?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/yNWXUJhGYNU?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Sunset"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Sunset
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Villa Bella Vista FPV */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden">
                 <div className="relative aspect-video w-full group cursor-pointer" onClick={() => handleVideoClick("https://www.youtube.com/embed/J-TaSBerSM0?rel=0&playsinline=1&controls=1&modestbranding=1")}>
                    {/* Overlay para click en desktop */}
                    <div className="absolute inset-0 z-20 hidden lg:block bg-transparent"></div>
                    <iframe
                       className="w-full h-full object-cover pointer-events-auto lg:pointer-events-none"
                       src="https://www.youtube.com/embed/J-TaSBerSM0?rel=0&playsinline=1&controls=1&modestbranding=1"
                       title="Villa Bella Vista FPV"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                       allowFullScreen
                     ></iframe>
                     <div className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                       <FaHome className="text-orange-500 text-lg" />
                     </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Villa Bella Vista 
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Coming Soon 4 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden h-full flex flex-col">
                 <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                   <img 
                     src="/images/villa_nueva.png" 
                     alt="Coming Soon Background" 
                     className="absolute inset-0 w-full h-full object-cover blur-md opacity-60"
                   />
                   <p className="relative z-10 text-gray-800 dark:text-white text-lg font-bold bg-white/30 dark:bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
                     Próximamente
                   </p>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Coming Soon
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Coming Soon 5 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden h-full flex flex-col">
                 <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                   <img 
                     src="/images/villa_nueva.png" 
                     alt="Coming Soon Background" 
                     className="absolute inset-0 w-full h-full object-cover blur-md opacity-60"
                   />
                   <p className="relative z-10 text-gray-800 dark:text-white text-lg font-bold bg-white/30 dark:bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
                     Próximamente
                   </p>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Coming Soon
                   </h3>
                 </div>
               </CardBody>
            </Card>

            {/* Coming Soon 6 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
               <CardBody className="p-0 overflow-hidden h-full flex flex-col">
                 <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                   <img 
                     src="/images/villa_nueva.png" 
                     alt="Coming Soon Background" 
                     className="absolute inset-0 w-full h-full object-cover blur-md opacity-60"
                   />
                   <p className="relative z-10 text-gray-800 dark:text-white text-lg font-bold bg-white/30 dark:bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
                     Próximamente
                   </p>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     Coming Soon
                   </h3>
                 </div>
               </CardBody>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white max-w-2xl mx-auto">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  ¿Quieres que tu proyecto aparezca aquí?
                </h3>
                <p className="text-orange-100 mb-6">
                  Contacta conmigo para crear videos únicos de tu casa o evento especial.
                </p>
                <a 
                  href="/contacto" 
                  className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-orange-50 transition-colors duration-300"
                >
                  Contactar Ahora
                </a>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
