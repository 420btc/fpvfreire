import { Card, CardBody, CardFooter, Image } from "@heroui/react";

const services = [
  {
    title: "Casas y Villas",
    description: "Destaca tu propiedad con tomas aéreas impresionantes",
    image: "/images/villa.png"
  },
  {
    title: "Eventos",
    description: "Captura momentos especiales desde una perspectiva única",
    image: "/images/evento.jpg"
  },
  {
    title: "Edificios/Construcciones",
    description: "Perspectivas únicas de obras y proyectos arquitectónicos",
    image: "/images/construccion.jpg"
  },
  {
    title: "Bodas y Celebraciones",
    description: "Captura los momentos más especiales de tu vida desde el aire",
    image: "/images/bodas_celebraciones.jpg"
  },
  {
    title: "Inspecciones Técnicas",
    description: "Análisis detallado y seguro de estructuras de difícil acceso",
    image: "/images/inspeccion.jpg"
  }
];

const Services = () => {
  return (
    <section id="servicios" className="py-16 bg-content1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Servicios Destacados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 w-full">
              <CardBody className="p-0">
                <Image
                  src={index === 0 ? "/images/villa_nueva.png" : service.image}
                  alt={service.title}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                />
              </CardBody>
              <CardFooter className="flex-col items-start p-2 md:p-4">
                <h3 className="text-sm md:text-base font-semibold text-center w-full">{service.title}</h3>
                <p className="text-xs md:text-sm text-default-500 text-center w-full mt-1">{service.description}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Botón Ver más */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg">
            Ver más
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;