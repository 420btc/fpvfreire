import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

const services = [
  {
    title: "Casas y Villas",
    description: "Destaca tu propiedad con tomas aéreas impresionantes",
    image: "https://img.heroui.chat/image/places?w=600&h=400&u=1"
  },
  {
    title: "Eventos",
    description: "Captura momentos especiales desde una perspectiva única",
    image: "https://img.heroui.chat/image/places?w=600&h=400&u=2"
  },
  {
    title: "Edificios/Construcciones",
    description: "Perspectivas únicas de obras y proyectos arquitectónicos",
    image: "https://img.heroui.chat/image/places?w=600&h=400&u=3"
  },
  {
    title: "Bodas y Celebraciones",
    description: "Captura los momentos más especiales de tu vida desde el aire",
    image: "https://img.heroui.chat/image/places?w=600&h=400&u=4"
  },
  {
    title: "Inspecciones Técnicas",
    description: "Análisis detallado y seguro de estructuras de difícil acceso",
    image: "https://img.heroui.chat/image/places?w=600&h=400&u=5"
  }
];

const Services = () => {
  return (
    <section id="servicios" className="py-16 bg-content1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Servicios Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardBody className="p-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              </CardBody>
              <CardFooter className="flex-col items-start">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-default-500">{service.description}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;