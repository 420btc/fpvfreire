import { Card, CardBody, Button } from "@heroui/react";
import { 
  FaPlane, 
  FaCamera, 
  FaBatteryFull, 
  FaLaptop,
  FaMemory,
  FaSdCard,
  FaWifi,
  FaGamepad,
  FaVideo
} from 'react-icons/fa';
import { 
  GiProcessor,
  GiBattery100
} from 'react-icons/gi';
import { 
  MdHighQuality,
  MdSpeed,
  MdPrecisionManufacturing
} from 'react-icons/md';
import { 
  SiAdobe
} from 'react-icons/si';

const equipmentCategories = [
  {
    id: 'drones',
    title: 'Drones',
    icon: <FaPlane className="text-6xl text-orange-500" />,
    description: 'Mi flota de drones FPV para grabaciones aéreas',
    items: [
      {
        name: 'Cinelog 25 V2 DJI O3',
        specs: 'Cinewhoop 2.5", 4K/120fps, DJI O3',
        icon: <FaPlane className="text-2xl text-orange-400" />
      },
      {
        name: 'Flywoo LR4 DJI O3',
        specs: 'Long Range, Sub250g, 4K/60fps, 30min vuelo',
        icon: <FaWifi className="text-2xl text-orange-400" />
      },
      {
        name: 'DJI Mini 2',
        specs: '4K/30fps, 31min vuelo, 10km alcance',
        icon: <FaPlane className="text-2xl text-orange-400" />
      },
      {
        name: 'Manta 5 DJI O3 6S',
        specs: 'Racing 5", DJI O3, Alta velocidad',
        icon: <MdSpeed className="text-2xl text-orange-400" />
      },
      {
        name: 'Chimera 7 DJI O3 6S',
        specs: 'Long Range 7", DJI O3, Máximo alcance 30km',
        icon: <FaWifi className="text-2xl text-orange-400" />
      }
    ]
  },
  {
    id: 'cameras',
    title: 'Cámaras',
    icon: <FaCamera className="text-6xl text-orange-500" />,
    description: 'Cámaras de alta resolución para todas las necesidades',
    items: [
      {
        name: 'GoPro Hero 12 Black Naked',
        specs: '5.3K/60fps, HyperSmooth 6.0',
        icon: <MdHighQuality className="text-2xl text-orange-400" />
      },
      {
        name: 'DJI Action 4',
        specs: '4K/120fps, Sensor 1/1.3"',
        icon: <FaVideo className="text-2xl text-orange-400" />
      },
      {
        name: 'Insta360 X3',
        specs: '360°, 5.7K, Estabilización FlowState',
        icon: <MdPrecisionManufacturing className="text-2xl text-orange-400" />
      },
      {
        name: 'Fujifilm XT2',
        specs: 'APSC, 4K/30fps, S-Log3',
        icon: <FaCamera className="text-2xl text-orange-400" />
      }
    ]
  },
  {
    id: 'batteries',
    title: 'Baterías',
    icon: <FaBatteryFull className="text-6xl text-orange-500" />,
    description: 'Sistemas de alimentación para largas sesiones',
    items: [
      {
        name: 'LiPo 6S 1300mAh',
        specs: 'Para drones racing, 100C descarga',
        icon: <GiBattery100 className="text-2xl text-orange-400" />
      },
      {
        name: 'LiPo 4S 1500mAh',
        specs: 'Cinewhoop, larga duración',
        icon: <FaBatteryFull className="text-2xl text-orange-400" />
      },
      {
        name: 'Power Bank 20000mAh',
        specs: 'Carga rápida, múltiples dispositivos',
        icon: <FaBatteryFull className="text-2xl text-orange-400" />
      },
      {
        name: 'Cargador Inteligente',
        specs: 'Carga simultánea 6 baterías',
        icon: <GiProcessor className="text-2xl text-orange-400" />
      }
    ]
  },
  {
    id: 'software',
    title: 'Software',
    icon: <FaLaptop className="text-6xl text-orange-500" />,
    description: 'Software profesional para edición de video',
    items: [
      {
        name: 'DaVinci Resolve Studio',
        specs: 'Edición profesional, Color grading',
        icon: <FaVideo className="text-2xl text-orange-400" />
      },
      {
        name: 'Adobe Premiere Pro',
        specs: 'Edición avanzada, Efectos visuales',
        icon: <SiAdobe className="text-2xl text-orange-400" />
      },
      {
        name: 'Final Cut Pro',
        specs: 'Edición optimizada para Mac',
        icon: <FaVideo className="text-2xl text-orange-400" />
      },
      {
        name: 'Adobe After Effects',
        specs: 'Motion graphics, Compositing',
        icon: <SiAdobe className="text-2xl text-orange-400" />
      }
    ]
  }
];

const additionalEquipment = [
  {
    category: 'Controladores',
    items: [
      { name: 'Tango 2 Pro', icon: <FaGamepad className="text-xl" /> },
      { name: 'Goggles 2 DJI', icon: <FaGamepad className="text-xl" /> }
    ]
  },
  {
    category: 'Almacenamiento',
    items: [
      { name: 'SSD 2TB Samsung T7', icon: <FaMemory className="text-xl" /> },
      { name: 'MicroSD 256GB V90', icon: <FaSdCard className="text-xl" /> }
    ]
  },
  {
    category: 'Accesorios',
    items: [
      { name: 'Gimbals Estabilizadores', icon: <MdSpeed className="text-xl" /> },
      { name: 'Filtros ND/CPL', icon: <FaCamera className="text-xl" /> }
    ]
  }
];

const EquipmentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-content1 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mi Equipo</h1>
          <p className="text-lg md:text-xl text-default-600 max-w-3xl mx-auto">
            Equipamiento profesional para producciones audiovisuales de alta calidad
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-default-700 leading-relaxed mb-8">
              Para ofrecer servicios de primer nivel, cuento con equipamiento profesional de última generación. 
              Cada pieza ha sido seleccionada cuidadosamente para garantizar la máxima calidad en todas mis producciones.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipmentCategories.map((category) => (
              <Card key={category.id} className="bg-content1 hover:bg-content2 transition-all duration-300 hover:scale-105">
                <CardBody className="p-8">
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-orange-500 mb-2">{category.title}</h3>
                    <p className="text-default-600">{category.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-default-100 hover:bg-default-200 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <p className="text-sm text-default-600">{item.specs}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Equipment */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Equipamiento Adicional</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalEquipment.map((section, index) => (
              <Card key={index} className="bg-background hover:bg-content2 transition-all duration-300">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold text-orange-500 mb-4 text-center">{section.category}</h3>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-default-100 transition-colors">
                        <div className="text-orange-400">
                          {item.icon}
                        </div>
                        <span className="text-default-700 font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Highlight */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Especificaciones Destacadas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-lg bg-gradient-to-b from-orange-500 to-orange-600 text-white">
                <FaVideo className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">4K/120fps</h3>
                <p className="text-sm opacity-90">Grabación ultra alta definición</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 text-white">
                <FaWifi className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">20km+</h3>
                <p className="text-sm opacity-90">Alcance máximo de transmisión</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-b from-green-500 to-green-600 text-white">
                <FaBatteryFull className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Ilimitada</h3>
                <p className="text-sm opacity-90">Autonomía de vuelo máxima</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-b from-purple-500 to-purple-600 text-white">
                <MdSpeed className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">150km/h</h3>
                <p className="text-sm opacity-90">Velocidad máxima racing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Te interesa saber cómo este equipamiento puede mejorar tu proyecto?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Cada herramienta está optimizada para ofrecer resultados excepcionales en cualquier tipo de producción.
          </p>
          <Button 
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-3 text-lg"
          >
            CONTÁCTAME AHORA
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EquipmentPage;