import { Card, CardBody, CardFooter, Button, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const servicesData = [
  {
    title: "Casas/Villas",
    description: "Captura tus mejores de propiedades con drones aéreos de alta resolución. Ideal para inmobiliarias, arquitectos y propietarios que desean destacar sus propiedades.",
    image: "/images/villa_nueva.png",
    price: "Desde 150€",
    features: ["Fotos aéreas HD", "Video promocional", "Edición profesional"]
  },
  {
    title: "Edificios/Construcciones",
    description: "Perspectivas únicas de obras y proyectos arquitectónicos. Documentación del progreso de construcción desde ángulos imposibles de conseguir desde tierra.",
    image: "/images/construccion.jpg",
    price: "Desde 75€",
    features: ["Seguimiento de obra", "Inspección técnica", "Documentación HD"]
  },
  {
    title: "Eventos",
    description: "Captura momentos únicos de alta calidad en eventos deportivos, conciertos, festivales y celebraciones. Una perspectiva completamente diferente.",
    image: "/images/evento.jpg",
    price: "Desde 100€",
    features: ["Cobertura completa", "Video en directo", "Edición el mismo día"]
  },
  {
    title: "Colegios",
    description: "Servicios especializados para centros educativos. Documentación de instalaciones, eventos deportivos y actividades académicas desde una perspectiva única.",
    image: "/images/colegio.jpg",
    price: "Desde 100€",
    features: ["Documentación escolar", "Eventos deportivos", "Promoción institucional"]
  },
  {
    title: "Naturaleza y Paisajes",
    description: "Explora y documenta la belleza natural de nuestros paisajes. Perfectos para documentales, turismo y conservación del medio ambiente.",
    image: "/images/naturaleza.jpg",
    price: "Desde 80€",
    features: ["Documentales naturales", "Turismo ecológico", "Conservación ambiental"]
  },
  {
    title: "Deportes y Acción",
    description: "Captura la emoción del deporte y la acción desde ángulos únicos. Ideal para equipos deportivos, atletas individuales y eventos competitivos.",
    image: "/images/deportes.jpg",
    price: "Desde 120€",
    features: ["Seguimiento dinámico", "Análisis deportivo", "Promoción atlética"]
  },
  {
    title: "Bodas y Celebraciones Especiales",
    description: "Inmortaliza los momentos más especiales de tu vida con tomas aéreas únicas. Bodas, aniversarios y celebraciones familiares desde una perspectiva mágica.",
    image: "/images/bodas_celebraciones.jpg",
    price: "Desde 200€",
    features: ["Ceremonia completa", "Fotos románticas", "Video cinematográfico"]
  },
  {
    title: "Publicidad y Marketing",
    description: "Contenido visual para promocionar tu negocio, producto o servicio. Campañas publicitarias con impacto visual garantizado.",
    image: "/images/blicidad.jpg",
    price: "Desde 60€",
    features: ["Campañas publicitarias", "Contenido para redes", "Branding empresarial"]
  },
  {
    title: "Inspecciones Técnicas",
    description: "Inspecciones especializadas de torres, antenas, tejados y estructuras de difícil acceso. Análisis detallado y seguro con tecnología de vanguardia.",
    image: "/images/inspeccion.jpg",
    price: "Desde 100€",
    features: ["Inspección detallada", "Informes técnicos", "Análisis estructural"]
  }
];

const workflowSteps = [
  {
    number: "1",
    title: "Contactar",
    description: "Cuéntanos todos los detalles de tu proyecto y necesidades"
  },
  {
    number: "2",
    title: "Planificación",
    description: "Planificamos el vuelo y preparamos el equipo necesario"
  },
  {
    number: "3",
    title: "Grabación",
    description: "Realizamos la grabación con la máxima calidad y profesionalidad"
  },
  {
    number: "4",
    title: "Edición",
    description: "Editamos y post-producimos el material con software profesional"
  }
];

const ServicesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const navigate = useNavigate();

  const handleServiceRequest = (serviceName: string) => {
    setSelectedService(serviceName);
    setFormData({
      ...formData,
      message: `Estoy interesado en el servicio de ${serviceName}. `
    });
    onOpen();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: selectedService,
      message: formData.message,
      to_name: 'Freire FPV'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('¡Solicitud enviada correctamente! Te contactaremos pronto.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        onOpenChange();
      }, (error) => {
        console.log('Error sending email:', error.text);
        alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
      });
  };

  const handleContactRedirect = () => {
    navigate('/contacto');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-content1 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-lg md:text-xl text-default-600 max-w-3xl mx-auto">
            Descubre todos los servicios que ofrecemos con drones FPV
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardBody className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {service.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-default-600 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <Icon icon="lucide:check" className="text-orange-500 mr-2" width={16} />
                          <span className="text-default-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 px-6 pb-6">
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                    size="lg"
                    onPress={() => handleServiceRequest(service.title)}
                  >
                    SOLICITAR
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">¿Cómo trabajamos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-default-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Qué servicio de grabación aérea necesitas para tu proyecto?
          </h2>
          <Button 
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-3 text-lg mt-6"
            onPress={handleContactRedirect}
          >
            CONTACTAR AHORA
          </Button>
        </div>
      </section>

      {/* Modal de Solicitud */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Solicitar Servicio: {selectedService}</h3>
                <p className="text-sm text-default-500">Completa el formulario y te contactaremos pronto</p>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} id="service-request-form">
                  <div className="space-y-4">
                    <Input
                      label="Nombre completo"
                      placeholder="Tu nombre"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      isRequired
                    />
                    <Input
                      label="Email"
                      placeholder="tu@email.com"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isRequired
                    />
                    <Input
                      label="Teléfono"
                      placeholder="Tu número de teléfono"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <Textarea
                      label="Mensaje"
                      placeholder="Cuéntanos más detalles sobre tu proyecto..."
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      minRows={4}
                      isRequired
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button 
                  color="primary" 
                  type="submit" 
                  form="service-request-form"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Enviar Solicitud
                </Button>
                <Button 
                  color="secondary" 
                  variant="bordered"
                  onPress={() => {
                    onClose();
                    handleContactRedirect();
                  }}
                >
                  Ir a Contacto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ServicesPage;