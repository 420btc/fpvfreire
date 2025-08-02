import { Card, CardBody, CardHeader } from "@heroui/react";
import { FaHome, FaGlassCheers } from 'react-icons/fa';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Galería de Videos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Aquí podrás ver una selección de nuestros mejores trabajos realizados para casas y eventos especiales.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video 1 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
               <div className="absolute top-3 right-3 z-10">
                 <FaHome className="text-orange-500 text-xl" />
               </div>
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Villa Aurora
                 </h3>
               </CardHeader>
              <CardBody>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                     width="100%"
                     height="100%"
                     src="https://www.youtube.com/embed/Wc61WUZAiFE"
                     title="Villa Aurora"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                </div>
               </CardBody>
            </Card>

            {/* Video 2 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
               <div className="absolute top-3 right-3 z-10">
                 <FaHome className="text-orange-500 text-xl" />
               </div>
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Villa Camelia
                 </h3>
               </CardHeader>
              <CardBody>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                     width="100%"
                     height="100%"
                     src="https://www.youtube.com/embed/v3Stsgpk55g"
                     title="Villa Camelia"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                </div>
               </CardBody>
            </Card>

            {/* Video 3 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
               <div className="absolute top-3 right-3 z-10">
                 <FaHome className="text-orange-500 text-xl" />
               </div>
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Villa Coto
                 </h3>
               </CardHeader>
              <CardBody>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                     width="100%"
                     height="100%"
                     src="https://www.youtube.com/embed/p5nh2fKd8kg"
                     title="Villa Coto"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                </div>
               </CardBody>
            </Card>

            {/* Video 4 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
               <div className="absolute top-3 right-3 z-10">
                 <FaHome className="text-orange-500 text-xl" />
               </div>
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Villa La Moraleda
                 </h3>
               </CardHeader>
              <CardBody>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                     width="100%"
                     height="100%"
                     src="https://www.youtube.com/embed/lfafRB6PlU8"
                     title="Villa La Moraleda"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                </div>
               </CardBody>
            </Card>

            {/* Video 5 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
               <div className="absolute top-3 right-3 z-10">
                 <FaHome className="text-orange-500 text-xl" />
               </div>
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Villa Camelia
                 </h3>
               </CardHeader>
              <CardBody>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                     width="100%"
                     height="100%"
                     src="https://www.youtube.com/embed/I4Vftp3-Gg8"
                     title="Villa Camelia"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                </div>
               </CardBody>
            </Card>

            {/* Video 6 */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
               <div className="absolute top-3 right-3 z-10">
                 <FaGlassCheers className="text-orange-500 text-xl" />
               </div>
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Fiesta Santa Angelo
                 </h3>
               </CardHeader>
              <CardBody>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                     width="100%"
                     height="100%"
                     src="https://www.youtube.com/embed/JLiyq1DJCHQ"
                     title="Fiesta Santa Angelo"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                </div>
               </CardBody>
            </Card>

            {/* Video 7 */}
              <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 blur-sm pointer-events-none opacity-60 relative">
                <div className="absolute top-3 right-3 z-10">
                  <FaHome className="text-orange-500 text-xl" />
                </div>
                <CardHeader className="pb-0">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Villa Cortijo Maza
                  </h3>
                </CardHeader>
               <CardBody>
                 <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/bvauiim7yzw"
                      title="Villa Cortijo Maza"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                 </div>
                </CardBody>
             </Card>

            {/* Video 8 - Coming Soon */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 blur-sm pointer-events-none opacity-60">
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Coming Soon
                 </h3>
               </CardHeader>
               <CardBody>
                 <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                   <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                     Próximamente
                   </p>
                 </div>
                </CardBody>
             </Card>

            {/* Video 9 - Coming Soon */}
             <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 blur-sm pointer-events-none opacity-60">
               <CardHeader className="pb-0">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                   Coming Soon
                 </h3>
               </CardHeader>
               <CardBody>
                 <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                   <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                     Próximamente
                   </p>
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