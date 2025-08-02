import { Card, CardBody, CardHeader } from "@heroui/react";

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
            {/* Placeholder cards for videos */}
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <Card key={index} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-0">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Video {index}
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      Video de YouTube #{index}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Descripción del video {index}. Aquí se mostrará información sobre el proyecto realizado.
                  </p>
                </CardBody>
              </Card>
            ))}
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