import { useEffect, useRef, useState } from 'react';
import { Card, CardBody, Button, Input, Textarea } from '@heroui/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaTwitter, FaInstagram, FaYoutube, FaLaptop } from 'react-icons/fa';
import emailjs from 'emailjs-com';

// Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiNDIwYnRjIiwiYSI6ImNtOTN3ejBhdzByNjgycHF6dnVmeHl2ZTUifQ.Utq_q5wN6DHwpkn6rcpZdw';

// OpenWeather API key
const OPENWEATHER_API_KEY = '5ae0c9a3137234e18e032e3d6024629e';

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  rain?: {
    '3h': number;
  };
}

interface WeatherForecast {
  list: WeatherData[];
}

const ContactPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // EmailJS configuration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // EmailJS service configuration
  const SERVICE_ID = 'service_k65jk6c' ; // Reemplaza con tu Service ID real
  const TEMPLATE_ADMIN = 'template_1exdmsp'; // Template que te llega a ti
  const TEMPLATE_CLIENT = 'template_tnzvsui'; // Template que le llega al cliente
  const PUBLIC_KEY = 'T0NH6Fx_YFfNyGSCO'; // Tu nueva Public Key

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Malaga,ES&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`
        );
        const data: WeatherForecast = await response.json();
        
        // Get real data: one forecast per day (every 8th item = 24 hours)
        // OpenWeather API returns forecasts every 3 hours, so every 8th item is roughly the same time next day
        const dailyForecasts = [];
        
        for (let i = 0; i < data.list.length && dailyForecasts.length < 7; i += 8) {
          dailyForecasts.push(data.list[i]);
        }
        
        // If we don't have 7 full days, fill with remaining data
        if (dailyForecasts.length < 7) {
          const remaining = 7 - dailyForecasts.length;
          const lastIndex = dailyForecasts.length * 8;
          
          for (let i = 0; i < remaining && (lastIndex + i) < data.list.length; i++) {
            dailyForecasts.push(data.list[lastIndex + i]);
          }
        }
        
        setWeatherData(dailyForecasts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    console.log('Initializing Mapbox map...');
    console.log('Mapbox token:', mapboxgl.accessToken);
    console.log('Map container:', mapContainer.current);

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [0, 20], // Start from a wider view
        zoom: 1,
        projection: 'globe' // Vista de globo en lugar de plana
      });

      // Configurar la vista de globo
      map.current.on('style.load', () => {
        map.current?.setFog({
          'color': 'rgb(186, 210, 235)', // Color del horizonte
          'high-color': 'rgb(36, 92, 223)', // Color del cielo
          'horizon-blend': 0.02, // Mezcla del horizonte
          'space-color': 'rgb(11, 11, 25)', // Color del espacio
          'star-intensity': 0.6 // Intensidad de las estrellas
        });
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        
        // Add service area circle first
        map.current?.addSource('service-area', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-4.4214, 36.7213]
            },
            properties: {}
          }
        });

        map.current?.addLayer({
          id: 'service-area-circle',
          type: 'circle',
          source: 'service-area',
          paint: {
            'circle-radius': {
              stops: [
                [8, 20],
                [12, 80],
                [16, 200]
              ],
              base: 2
            },
            'circle-color': '#ff6b35',
            'circle-opacity': 0.3,
            'circle-stroke-color': '#ff6b35',
            'circle-stroke-width': 2
          }
        });

        // Add marker for Málaga
        new mapboxgl.Marker({ color: '#ff6b35' })
          .setLngLat([-4.4214, 36.7213])
          .addTo(map.current!);

        // Add service zone points
        const serviceZones = [
          [-4.8857, 36.5108], // Marbella
          [-4.4998, 36.6203], // Torremolinos
          [-4.5487, 36.5988], // Benalmádena
          [-4.6298, 36.5470], // Fuengirola
          [-4.5593, 37.0179], // Antequera
          [-5.1662, 36.7429], // Ronda
          [-4.3514, 36.7213], // El Palo, Málaga
          [-3.8740, 36.7520]  // Nerja
        ];

        // Add source for service zone points
        map.current?.addSource('service-zones', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: serviceZones.map((coords, index) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coords
              },
              properties: {
                id: index
              }
            }))
          }
        });

        // Add layer for service zone points
        map.current?.addLayer({
          id: 'service-zones-points',
          type: 'circle',
          source: 'service-zones',
          paint: {
            'circle-radius': 6,
            'circle-color': '#ff6b35',
            'circle-opacity': 0.8,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1
          }
        });

        // Fly to Málaga with dramatic animation from globe view
        setTimeout(() => {
          map.current?.flyTo({
            center: [-4.4214, 36.7213],
            zoom: 11,
            duration: 4000, // Duración más larga para efecto dramático
            essential: true,
            curve: 1.2, // Curva más pronunciada para efecto de vuelo
            speed: 0.7, // Velocidad más lenta para mejor efecto visual
            easing: (t) => t * (2 - t) // Easing suave para entrada y salida
          });
        }, 2000); // Esperar más tiempo para apreciar la vista del globo
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Prepare template parameters for admin email
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Freire FPV', // Tu nombre o empresa
        to_email: 'carlosfreire777@gmail.com', // Tu email donde quieres recibir los mensajes
        reply_to: formData.email
      };
      
      // Send email to admin (you)
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ADMIN,
        templateParams,
        PUBLIC_KEY
      );
      
      // Send confirmation email to client
      const clientParams = {
        from_name: 'Freire FPV',
        from_email: 'carlosfreire777@gmail.com', // Tu email como remitente
        to_name: formData.name,
        to_email: formData.email, // Email del cliente
        subject: `Confirmación: ${formData.subject}`,
        original_message: formData.message
      };
      
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_CLIENT,
        clientParams,
        PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWeatherColor = (rain: number, wind: number) => {
    if (rain >= 1 || wind >= 20) return 'bg-red-500';
    return 'bg-green-500';
  };

  const getWeatherIcon = (iconCode: string) => {
    // Asegurarse de que siempre usamos la versión diurna del icono para el sol (01d)
    if (iconCode === '01n') {
      return 'https://openweathermap.org/img/wn/01d@2x.png';
    }
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[date.getDay()];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-content1 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacta conmigo</h1>
          <p className="text-lg md:text-xl text-default-600 max-w-3xl mx-auto">
            Estoy aquí para ayudarte con tu próximo proyecto audiovisual
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="bg-content1">
              <CardBody className="p-8 lg:p-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-orange-500 mb-6 lg:mb-8">
                  Información de Contacto
                </h2>
                
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <div className="bg-orange-500 p-3 lg:p-4 rounded-full">
                      <FaPhone className="text-white text-lg lg:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base lg:text-lg">Teléfono</h3>
                      <p className="text-default-600 text-sm lg:text-base">+34 685 78 83 25</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <div className="bg-orange-500 p-3 lg:p-4 rounded-full">
                      <FaEnvelope className="text-white text-lg lg:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base lg:text-lg">Email</h3>
                      <p className="text-default-600 text-sm lg:text-base">fpvfcarlos@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <div className="bg-orange-500 p-3 lg:p-4 rounded-full">
                      <FaMapMarkerAlt className="text-white text-lg lg:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base lg:text-lg">Ubicación</h3>
                      <p className="text-default-600 text-sm lg:text-base">Málaga, Costa del Sol</p>
                      <p className="text-default-600 text-sm lg:text-base">Operamos en toda Andalucía</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <div className="bg-orange-500 p-3 lg:p-4 rounded-full">
                      <FaClock className="text-white text-lg lg:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base lg:text-lg">Horario</h3>
                      <p className="text-default-600 text-sm lg:text-base">Lunes a Viernes: 8:00 - 19:00</p>
                      <p className="text-default-600 text-sm lg:text-base">Sábados: 9:00 - 14:00</p>
                      <p className="text-default-600 text-sm lg:text-base">Domingos: Cerrado</p>
                    </div>
                  </div>

                  <div className="flex space-x-4 lg:space-x-6 pt-4 lg:pt-6">
                    <a href="https://www.instagram.com/cpf.pv/" target="_blank" rel="noopener noreferrer" className="bg-pink-600 p-3 lg:p-4 rounded-full cursor-pointer hover:bg-pink-700 transition-colors">
                      <FaInstagram className="text-white text-lg lg:text-xl" />
                    </a>
                    <a href="https://www.youtube.com/@CarlosFreire" target="_blank" rel="noopener noreferrer" className="bg-red-600 p-3 lg:p-4 rounded-full cursor-pointer hover:bg-red-700 transition-colors">
                      <FaYoutube className="text-white text-lg lg:text-xl" />
                    </a>
                    <a href="https://x.com/CarlosFreire0" target="_blank" rel="noopener noreferrer" className="bg-blue-400 p-3 lg:p-4 rounded-full cursor-pointer hover:bg-blue-500 transition-colors">
                      <FaTwitter className="text-white text-lg lg:text-xl" />
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Contact Form */}
            <Card className="bg-content1">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">
                  Envíame un mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    name="name"
                    label="Nombre"
                    placeholder="Tu nombre completo"
                    variant="bordered"
                    className="w-full"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    variant="bordered"
                    className="w-full"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    name="phone"
                    label="Teléfono"
                    placeholder="+34 123 456 789"
                    variant="bordered"
                    className="w-full"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  
                  <Input
                    name="subject"
                    label="Asunto"
                    placeholder="Asunto del mensaje"
                    variant="bordered"
                    className="w-full"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Textarea
                    name="message"
                    label="Mensaje"
                    placeholder="Cuéntame sobre tu proyecto..."
                    variant="bordered"
                    minRows={4}
                    className="w-full"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                      ¡Mensaje enviado correctamente! Te responderemos pronto.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                      Error al enviar el mensaje. Por favor, inténtalo de nuevo.
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Área de Servicio</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <div 
                ref={mapContainer} 
                className="w-full h-96 rounded-lg shadow-lg"
                style={{ minHeight: '400px' }}
              />
            </div>
            
            {/* Service Areas List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Zonas de Servicio</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Málaga capital</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Costa del Sol</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Marbella</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Torremolinos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Benalmádena</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Fuengirola</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Antequera</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Ronda</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-100 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Información sobre condiciones meteorológicas</h4>
                <p className="text-sm text-orange-700">
                  Consulta las condiciones meteorológicas antes de planificar tu sesión. 
                  Las condiciones de viento y lluvia pueden afectar la calidad de las grabaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Forecast */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Previsión Meteorológica - Málaga</h2>
          
          {/* Current Conditions */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Current Weather */}
              <Card className="bg-content1 border border-orange-500">
                <CardBody className="p-4 text-center">
                  <h3 className="text-lg font-bold text-orange-500 mb-2">Clima Actual</h3>
                  {loading ? (
                    <div className="text-sm opacity-80">Cargando...</div>
                  ) : weatherData.length > 0 ? (
                    <>
                      <div className="flex justify-center mb-2">
                        <img 
                          src={getWeatherIcon(weatherData[0].weather[0].icon)}
                          alt={weatherData[0].weather[0].description}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="text-2xl font-bold mb-1">{Math.round(weatherData[0].main.temp)}°C</div>
                      <div className="text-sm mb-2 capitalize">{weatherData[0].weather[0].description}</div>
                      <div className="text-xs space-y-1">
                        <div>💧 Humedad: {weatherData[0].main.humidity}%</div>
                        <div>💨 Viento: {(weatherData[0].wind.speed * 3.6).toFixed(0)} km/h</div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm opacity-80">No hay datos disponibles</div>
                  )}
                </CardBody>
              </Card>

              {/* Flight Conditions */}
              <Card className="bg-content1 border border-orange-500">
                <CardBody className="p-4 text-center">
                  <h3 className="text-lg font-bold text-orange-500 mb-2">Condiciones de Vuelo</h3>
                  {loading ? (
                    <div className="text-sm opacity-80">Evaluando...</div>
                  ) : weatherData.length > 0 ? (
                    <>
                      {(() => {
                        const rainAmount = weatherData[0].rain?.['3h'] || 0;
                        const isOptimal = rainAmount < 1;
                        
                        return (
                          <>
                            <div className={`text-2xl font-bold mb-2 ${
                              isOptimal ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {isOptimal ? '✅ ÓPTIMAS' : '⚠️ ADVERSAS'}
                            </div>
                            <div className="text-3xl font-bold mt-4">
                              💧 {rainAmount.toFixed(1)}mm
                            </div>
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    <div className="text-sm opacity-80">No se puede evaluar</div>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Previsión de 7 Días - Málaga</h3>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {loading ? (
                <div className="w-full text-center py-8">
                  <p>Cargando previsión meteorológica...</p>
                </div>
              ) : (
                weatherData.map((day, index) => {
                  const rainAmount = day.rain?.['3h'] || 0;
                  const windSpeed = day.wind.speed * 3.6; // Convert m/s to km/h
                  const colorClass = getWeatherColor(rainAmount, windSpeed);
                  
                  return (
                    <Card key={index} className={`${colorClass} text-white w-32 md:w-36 flex-shrink-0`}>
                      <CardBody className="p-3 md:p-4 text-center">
                        <h3 className="font-bold mb-2 text-sm md:text-base">{formatDate(day.dt)}</h3>
                        <div className="flex justify-center mb-2">
                          <img 
                            src={getWeatherIcon(day.weather[0].icon)}
                            alt={day.weather[0].description}
                            className="w-10 h-10 md:w-12 md:h-12 object-contain"
                          />
                        </div>
                        <p className="text-sm md:text-base font-semibold mb-1">{Math.round(day.main.temp)}°C</p>
                        <p className="text-xs mb-1">💧 {rainAmount.toFixed(1)}mm</p>
                        <p className="text-xs mb-2">💨 {windSpeed.toFixed(0)}km/h</p>
                        <div className="mt-1">
                          {rainAmount < 1 && windSpeed < 20 ? (
                            <span className="text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded">Óptimo</span>
                          ) : (
                            <span className="text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded">Adversas</span>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  );
                })
              )}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-default-600 mb-4">
                * Las condiciones se evalúan según lluvia (mm) y viento (km/h)
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Óptimo: &lt;1mm lluvia, &lt;20km/h viento</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Condiciones adversas: ≥1mm lluvia o ≥20km/h viento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Otros Servicios */}
      <section className="py-16 bg-content2">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Descubre mis otros servicios
            </h2>
            
            <Card className="bg-content1 hover:shadow-lg transition-shadow duration-300">
              <CardBody className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="bg-orange-500 p-6 rounded-full">
                    <FaLaptop className="text-white text-4xl" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Desarrollo Full Stack
                    </h3>
                    <p className="text-default-600 text-lg mb-6">
                      Además de los servicios de drones, también me dedico al desarrollo web y aplicaciones. 
                      Descubre mi portfolio de proyectos tecnológicos.
                    </p>
                    <a 
                      href="https://portfoliodos.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button 
                        size="lg"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3"
                      >
                        VER PORTFOLIO
                      </Button>
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-background">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-orange-500 mb-2">
                  ¿Qué es un drone FPV y en qué se diferencia de los drones normales?
                </h3>
                <p className="text-default-700">
                  Un drone FPV (First Person View) permite al piloto ver en tiempo real lo que ve la cámara del drone, 
                  ofreciendo un control más preciso y tomas cinematográficas únicas. Son ideales para grabaciones 
                  dinámicas y seguimientos de acción.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-background">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-orange-500 mb-2">
                  ¿Cuánto tiempo tarda la entrega de un proyecto finalizado?
                </h3>
                <p className="text-default-700">
                  El tiempo de entrega depende de la complejidad del proyecto. Proyectos simples pueden estar listos 
                  en 3-5 días, mientras que producciones más complejas pueden requerir 1-2 semanas.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-background">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-orange-500 mb-2">
                  ¿Se necesitan permisos especiales para grabar con drones?
                </h3>
                <p className="text-default-700">
                  Sí, dependiendo de la ubicación y tipo de grabación. Nosotros nos encargamos de todos los permisos 
                  necesarios y cumplimos con la normativa AESA vigente.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-background">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-orange-500 mb-2">
                  ¿Qué formatos de archivo recibiré con mis grabaciones?
                </h3>
                <p className="text-default-700">
                  Entregamos los archivos en formato 4K MP4 para uso general, y también podemos proporcionar 
                  archivos RAW o en otros formatos específicos según tus necesidades.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-background">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-orange-500 mb-2">
                  ¿Se pueden realizar grabaciones en interiores?
                </h3>
                <p className="text-default-700">
                  Sí, utilizamos drones cinewhoop especialmente diseñados para espacios interiores, 
                  con protecciones que permiten volar de forma segura cerca de personas y objetos.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes alguna pregunta que no encuentras aquí?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            No dudes en contactarme directamente. Estaré encantado de ayudarte con tu proyecto.
          </p>
          <Button 
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-3 text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            CONTÁCTAME AHORA
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;