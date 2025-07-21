import { Card, CardBody, Button } from "@heroui/react";
import { useState, useRef, useEffect } from 'react';
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
  MdSpeed
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
        icon: <FaPlane className="text-2xl text-orange-400" />
      },
      {
        name: 'DJI Mini 2',
        specs: '4K/30fps, 31min vuelo, 10km alcance',
        icon: <FaPlane className="text-2xl text-orange-400" />
      },
      {
        name: 'Manta 5 DJI O3 6S',
        specs: 'Racing 5", DJI O3, Alta velocidad',
        icon: <FaPlane className="text-2xl text-orange-400" />
      },
      {
        name: 'Chimera 7 DJI O3 6S',
        specs: 'Long Range 7", DJI O3, Máximo alcance 30km',
        icon: <FaPlane className="text-2xl text-orange-400" />
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
        icon: <FaVideo className="text-2xl text-orange-400" />
      },
      {
        name: 'DJI Action 4',
        specs: '4K/120fps, Sensor 1/1.3"',
        icon: <FaVideo className="text-2xl text-orange-400" />
      },
      {
        name: 'Insta360 X3',
        specs: '360°, 5.7K, Estabilización FlowState',
        icon: <FaVideo className="text-2xl text-orange-400" />
      },
      {
        name: 'Fujifilm XT2',
        specs: 'APSC, 4K/30fps, S-Log3',
        icon: <FaCamera className="text-2xl text-orange-400" />
      },
      {
        name: 'DJI Goggles 2',
        specs: '100fps 1080p, Visión del dron y resultado previo',
        icon: <FaVideo className="text-2xl text-orange-400" />
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
        icon: <GiBattery100 className="text-2xl text-orange-400" />
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
        icon: <MdSpeed className="text-2xl text-orange-400" />
      },
      {
        name: 'Adobe Premiere Pro',
        specs: 'Edición avanzada, Efectos visuales',
        icon: <SiAdobe className="text-2xl text-orange-400" />
      },
      {
        name: 'Final Cut Pro',
        specs: 'Edición optimizada para Mac',
        icon: <MdSpeed className="text-2xl text-orange-400" />
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
  const [gameMode, setGameMode] = useState(false);
  const [routePoints, setRoutePoints] = useState<{x: number, y: number, id: number}[]>([]);
  const [routeCurves, setRouteCurves] = useState<{startX: number, startY: number, midX: number, midY: number, endX: number, endY: number}[]>([]);
  const [isPlanning, setIsPlanning] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [dronePosition, setDronePosition] = useState({x: -60, y: 64});
  const [countdown, setCountdown] = useState(0);
  const [videoSignal, setVideoSignal] = useState(100); // % de señal de video
  const [totalDistance, setTotalDistance] = useState(0); // Distancia total en metros
  const [currentDistance, setCurrentDistance] = useState(0); // Distancia actual durante el vuelo
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const countdownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGameAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !gameMode || isPlanning || isFlying) return;
    
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Añadir nuevo punto a la ruta (máximo 6)
    if (routePoints.length < 6) {
      const newPoint = {x, y, id: Date.now()};
      const newRoutePoints = [...routePoints, newPoint];
      setRoutePoints(newRoutePoints);
      
      // Limpiar temporizador anterior si existe
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
      
      // Calcular nueva distancia y afectar señal de video inmediatamente
      updateTelemetry(newRoutePoints);
      
      // Iniciar countdown de 3 segundos
      setCountdown(3);
      startCountdown(newRoutePoints);
      
      // Si llegamos al máximo, empezar inmediatamente
      if (newRoutePoints.length === 6) {
        setCountdown(0);
        if (countdownTimerRef.current) {
          clearTimeout(countdownTimerRef.current);
        }
        startRoute(newRoutePoints);
      }
    }
  };

  const startCountdown = (points: {x: number, y: number, id: number}[]) => {
    let timeLeft = 3;
    
    const countdownInterval = setInterval(() => {
      timeLeft--;
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        startRoute(points);
      }
    }, 1000);
    
    countdownTimerRef.current = countdownInterval;
  };

  const startRoute = (points: {x: number, y: number, id: number}[]) => {
    setCountdown(0);
    setIsPlanning(true);
    setCurrentPointIndex(0);
    
    // Generar todas las curvas de una vez y guardarlas
    const currentDronePos = {x: dronePosition.x + 20, y: dronePosition.y};
    const curves = points.map((point, index) => {
      const startPoint = index === 0 
        ? currentDronePos
        : points[index - 1];
      
      const midX = (startPoint.x + point.x) / 2 + (Math.random() - 0.5) * 100;
      const randomCurveHeight = Math.random() * 30 + 20;
      const midY = Math.min(startPoint.y, point.y) - randomCurveHeight;
      
      const curve = {
        startX: startPoint.x,
        startY: startPoint.y,
        midX: midX,
        midY: midY,
        endX: point.x,
        endY: point.y
      };
      
      console.log(`Generated curve ${index}:`, curve);
      return curve;
    });
    
    setRouteCurves(curves);
    
    // Después de 3 segundos, empezar a volar
    setTimeout(() => {
      setIsPlanning(false);
      setIsFlying(true);
      // Pasar las curvas directamente para evitar problemas de estado
      flyToNextPointWithCurves(points, 0, curves);
    }, 3000);
  };

  const flyToNextPointWithCurves = (
    points: {x: number, y: number, id: number}[], 
    pointIndex: number, 
    curves: {startX: number, startY: number, midX: number, midY: number, endX: number, endY: number}[]
  ) => {
    if (pointIndex >= points.length) {
      // Ruta completada, resetear después de 3 segundos
      setTimeout(() => {
        resetRoute();
      }, 3000);
      return;
    }

    setCurrentPointIndex(pointIndex);
    
    // Usar la curva pregenerada
    animateDroneAlongCurveWithData(pointIndex, points, curves);
  };

  const animateDroneAlongCurveWithData = (
    pointIndex: number,
    allPoints: {x: number, y: number, id: number}[],
    curves: {startX: number, startY: number, midX: number, midY: number, endX: number, endY: number}[]
  ) => {
    // Verificar que las curvas existan
    if (!curves || curves.length === 0 || !curves[pointIndex]) {
      console.log('No curve found for index:', pointIndex, 'curves:', curves);
      return;
    }
    
    const curve = curves[pointIndex];
    const duration = 2250; // 25% más rápido (3000 * 0.75 = 2250ms)
    const startTime = Date.now();
    
    console.log('Starting animation for point', pointIndex, 'with curve:', curve);
    
    const animateStep = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Curva de Bézier cuadrática usando la curva pregenerada
      const t = progress;
      const x = Math.pow(1-t, 2) * curve.startX + 2*(1-t)*t * curve.midX + Math.pow(t, 2) * curve.endX;
      const y = Math.pow(1-t, 2) * curve.startY + 2*(1-t)*t * curve.midY + Math.pow(t, 2) * curve.endY;
      
      setDronePosition({x, y});
      
      // Actualizar telemetría en tiempo real durante el vuelo
      updateRealTimeTelemetry(progress, pointIndex, curves);
      
      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        console.log('Animation completed for point', pointIndex);
        // Llegó al destino, ir al siguiente punto
        setTimeout(() => {
          flyToNextPointWithCurves(allPoints, pointIndex + 1, curves);
        }, 500); // Pequeña pausa en cada punto
      }
    };
    
    animateStep();
  };

  const calculateRouteDistance = (points: {x: number, y: number, id: number}[]) => {
    let totalDist = 0;
    
    for (let i = 0; i < points.length; i++) {
      const startPoint = i === 0 
        ? {x: dronePosition.x + 20, y: dronePosition.y}
        : points[i - 1];
      const endPoint = points[i];
      
      // Calcular distancia euclidiana y convertir píxeles a metros
      // Área de ~1200px de ancho = 2.5km, por lo tanto 1px = ~2.08m
      const distance = Math.sqrt(
        Math.pow(endPoint.x - startPoint.x, 2) + 
        Math.pow(endPoint.y - startPoint.y, 2)
      ) * 2.08;
      
      totalDist += distance;
    }
    
    return totalDist;
  };

  const updateTelemetry = (points: {x: number, y: number, id: number}[]) => {
    const totalDist = calculateRouteDistance(points);
    setTotalDistance(Math.round(totalDist));
    // No actualizar señal aquí - se hará en tiempo real según posición del dron
  };

  const updateRealTimeTelemetry = (
    progress: number, 
    currentSegment: number, 
    curves: {startX: number, startY: number, midX: number, midY: number, endX: number, endY: number}[]
  ) => {
    // Calcular posición actual del dron
    const currentCurve = curves[currentSegment];
    if (!currentCurve) return;
    
    const t = progress;
    const currentX = Math.pow(1-t, 2) * currentCurve.startX + 2*(1-t)*t * currentCurve.midX + Math.pow(t, 2) * currentCurve.endX;
    const currentY = Math.pow(1-t, 2) * currentCurve.startY + 2*(1-t)*t * currentCurve.midY + Math.pow(t, 2) * currentCurve.endY;
    
    // Calcular distancia desde el punto inicial (base del piloto) hasta posición actual del dron
    const baseX = -40; // Posición inicial del dron
    const baseY = 64;
    const distanceFromBase = Math.sqrt(
      Math.pow(currentX - baseX, 2) + 
      Math.pow(currentY - baseY, 2)
    ) * 2.08; // Convertir a metros (2.5km en ~1200px)
    
    console.log(`Dron en (${currentX.toFixed(1)}, ${currentY.toFixed(1)}) - Distancia desde base: ${distanceFromBase.toFixed(1)}m`);
    
    // Calcular distancia recorrida total (para telemetría)
    let distanceFlown = 0;
    
    // Distancia de segmentos completados
    for (let i = 0; i < currentSegment; i++) {
      const curve = curves[i];
      if (curve) {
        const segmentDist = Math.sqrt(
          Math.pow(curve.endX - curve.startX, 2) + 
          Math.pow(curve.endY - curve.startY, 2)
        ) * 2.08;
        distanceFlown += segmentDist;
      }
    }
    
    // Distancia del segmento actual (parcial)
    if (currentCurve) {
      const segmentDist = Math.sqrt(
        Math.pow(currentCurve.endX - currentCurve.startX, 2) + 
        Math.pow(currentCurve.endY - currentCurve.startY, 2)
      ) * 2.08;
      distanceFlown += segmentDist * progress;
    }
    
    setCurrentDistance(Math.round(distanceFlown));
    
    // Calcular señal basada en distancia desde la base con escala realista
    let signalPercentage = 100;
    
    if (distanceFromBase <= 300) {
      // 0-300m: De 100% a 70% (pérdida gradual de 30%)
      signalPercentage = 100 - ((distanceFromBase / 300) * 30);
    } else if (distanceFromBase <= 500) {
      // 300-500m: De 70% a 60% (pérdida de 10% en 200m)
      const progressIn200m = (distanceFromBase - 300) / 200;
      signalPercentage = 70 - (progressIn200m * 10);
    } else if (distanceFromBase <= 700) {
      // 500-700m: De 60% a 55% (pérdida de 5% en 200m)
      const progressIn200m = (distanceFromBase - 500) / 200;
      signalPercentage = 60 - (progressIn200m * 5);
    } else if (distanceFromBase <= 1000) {
      // 700-1000m: De 55% a 45% (pérdida de 10% en 300m)
      const progressIn300m = (distanceFromBase - 700) / 300;
      signalPercentage = 55 - (progressIn300m * 10);
    } else if (distanceFromBase <= 1300) {
      // 1000-1300m: De 45% a 35% (pérdida de 10% en 300m)
      const progressIn300m = (distanceFromBase - 1000) / 300;
      signalPercentage = 45 - (progressIn300m * 10);
    } else if (distanceFromBase <= 1600) {
      // 1300-1600m: De 35% a 25% (pérdida de 10% en 300m)
      const progressIn300m = (distanceFromBase - 1300) / 300;
      signalPercentage = 35 - (progressIn300m * 10);
    } else if (distanceFromBase <= 2000) {
      // 1600-2000m: De 25% a 15% (pérdida de 10% en 400m)
      const progressIn400m = (distanceFromBase - 1600) / 400;
      signalPercentage = 25 - (progressIn400m * 10);
    } else {
      // Más de 2000m: Fluctuación aleatoria entre 5% y 10%
      signalPercentage = 5 + Math.random() * 5; // Entre 5% y 10%
    }
    
    const newSignal = Math.round(Math.max(5, signalPercentage));
    console.log(`${distanceFromBase.toFixed(0)}m → ${newSignal}% señal`);
    setVideoSignal(newSignal);
  };

  const resetRoute = () => {
    if (countdownTimerRef.current) {
      clearTimeout(countdownTimerRef.current);
    }
    setRoutePoints([]);
    setRouteCurves([]);
    setIsFlying(false);
    setIsPlanning(false);
    setCurrentPointIndex(0);
    setCountdown(0);
    setVideoSignal(100);
    setTotalDistance(0);
    setCurrentDistance(0);
    setDronePosition({x: -60, y: 64});
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 70) return 'text-green-500';
    if (signal >= 30) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-content1 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mi Equipo</h1>
          <p className="text-lg md:text-xl text-default-600 max-w-3xl mx-auto mb-8">
            Equipamiento profesional para producciones audiovisuales de alta calidad
          </p>
          
                    {/* Game Mode Toggle - Solo PC */}
          {!isMobile && (
            <div className="mb-4">
              <Button
                size="sm"
                variant={gameMode ? "solid" : "bordered"}
                onPress={() => setGameMode(!gameMode)}
                className={`text-sm ${
                  gameMode 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' 
                    : 'border-orange-500 text-orange-500 hover:bg-orange-50'
                }`}
              >
                {gameMode ? '🎮 Modo Juego ON' : '🎮 Activar Juego'}
              </Button>
              {gameMode && (
                <div className="text-xs text-default-500 mt-2">
                  <p>¡Crea una ruta de hasta 6 puntos! ({routePoints.length}/6)</p>
                  {countdown > 0 && (
                    <p className="text-orange-600 font-bold">
                      ⏱️ Salida en {countdown}s (haz clic para añadir más puntos)
                    </p>
                  )}
                  {routePoints.length > 0 && !isPlanning && !isFlying && countdown === 0 && (
                    <Button
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={resetRoute}
                      className="text-xs mt-1"
                    >
                      🗑️ Limpiar Ruta
                    </Button>
                  )}
                </div>
              )}
              
              {/* Telemetría Compacta */}
              {gameMode && (routePoints.length > 0 || isFlying) && (
                                 <div className="mt-2 flex items-center justify-center gap-6 font-mono text-xs">
                   {/* Señal de Video */}
                   <div className="flex items-center gap-1">
                     <span className="text-gray-400">📹</span>
                     <span className="text-orange-500 font-medium">Señal de Video</span>
                     <span className={`font-bold ${getSignalColor(videoSignal)}`}>
                       {videoSignal}%
                     </span>
                   </div>
                   
                   {/* Distancia */}
                   <div className="flex items-center gap-1">
                     <span className="text-gray-400">📏</span>
                     <span className="text-orange-500 font-medium">Distancia</span>
                     <span className="text-blue-400 font-bold">
                       {isFlying 
                         ? (currentDistance >= 1000 ? `${(currentDistance / 1000).toFixed(1)}km` : `${currentDistance}m`)
                         : (totalDistance >= 1000 ? `${(totalDistance / 1000).toFixed(1)}km` : `${totalDistance}m`)
                       }
                     </span>
                   </div>
                  
                                     {/* Alerta crítica compacta */}
                   {videoSignal <= 15 && (
                     <span className="text-red-500 animate-pulse font-bold">🚨</span>
                   )}
                </div>
              )}
            </div>
          )}

          {/* Drone Animation */}
          <div 
            ref={gameAreaRef}
            className={`relative h-32 w-full max-w-6xl mx-auto ${
              gameMode && !isMobile ? 'cursor-crosshair' : ''
            }`}
            onClick={handleGameAreaClick}
          >
            {/* Trail SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {!gameMode ? (
                <path 
                  className="drone-trail"
                  d="M-50,40 Q200,20 400,45 T800,35 Q1000,30 1200,40"
                  stroke="#ff8000"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="5,5"
                />
              ) : (
                <>
                  {/* Rutas entre puntos */}
                  {routePoints.length > 0 && routeCurves.length > 0 && routePoints.map((point, index) => {
                    const curve = routeCurves[index];
                    if (!curve) return null;
                    
                    return (
                      <path
                        key={point.id}
                        className={
                          isPlanning ? "planning-curve" : 
                          (isFlying && index <= currentPointIndex) ? "game-trail-active" : "game-trail-curve"
                        }
                        d={`M${curve.startX},${curve.startY} Q${curve.midX},${curve.midY} ${curve.endX},${curve.endY}`}
                        stroke="#ff8000"
                        strokeWidth="2"
                        fill="none"
                        opacity={
                          isFlying && index <= currentPointIndex ? "0.8" : "0.6"
                        }
                        strokeDasharray="5,5"
                      />
                    );
                  })}
                  
                  {/* Línea original cuando no hay puntos */}
                  {routePoints.length === 0 && (
                    <path 
                      className="drone-trail"
                      d="M-50,64 Q200,44 400,69 T800,59 Q1000,54 1200,64"
                      stroke="#ff8000"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                      strokeDasharray="5,5"
                    />
                  )}
                  
                  {/* Puntos de la ruta - Solo en modo juego */}
                  {gameMode && routePoints.map((point, index) => (
                    <g key={point.id}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="#ff8000"
                        opacity="0.8"
                        className={
                          isPlanning ? "target-pulse" : 
                          (isFlying && index === currentPointIndex) ? "target-active" :
                          (isFlying && index < currentPointIndex) ? "target-completed" : "target-waiting"
                        }
                      />
                      <text
                        x={point.x}
                        y={point.y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {index + 1}
                      </text>
                    </g>
                  ))}
                </>
              )}
            </svg>
            
            {/* Drone */}
            <div className={gameMode ? "drone-container-game" : "drone-container"}>
              <div className="drone">
                {/* Drone Body */}
                <div className="drone-body">
                  <div className="drone-center"></div>
                  {/* Propellers */}
                  <div className="propeller propeller-1">
                    <div className="blade blade-1"></div>
                    <div className="blade blade-2"></div>
                  </div>
                  <div className="propeller propeller-2">
                    <div className="blade blade-1"></div>
                    <div className="blade blade-2"></div>
                  </div>
                  <div className="propeller propeller-3">
                    <div className="blade blade-1"></div>
                    <div className="blade blade-2"></div>
                  </div>
                  <div className="propeller propeller-4">
                    <div className="blade blade-1"></div>
                    <div className="blade blade-2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            {gameMode && (countdown > 0 || isPlanning || isFlying || (routePoints.length > 0 && routePoints.length < 6)) && (
              <div className="absolute top-2 left-2 text-xs bg-orange-500 text-white px-2 py-1 rounded">
                {countdown > 0 && `⏱️ Salida en ${countdown}s - Ruta de ${routePoints.length} punto${routePoints.length !== 1 ? 's' : ''}`}
                {isPlanning && countdown === 0 && `📍 Generando ruta de ${routePoints.length} punto${routePoints.length !== 1 ? 's' : ''}...`}
                {isFlying && `🚁 Volando al punto ${currentPointIndex + 1}/${routePoints.length}`}
                {!isPlanning && !isFlying && routePoints.length > 0 && routePoints.length < 6 && countdown === 0 && `✋ Añade más puntos (${routePoints.length}/6)`}
              </div>
            )}
          </div>
        </div>
        
        {/* CSS Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .drone-container {
              position: absolute;
              top: 50%;
              left: -60px;
              transform: translateY(-50%);
              z-index: 2;
              animation: flyAcross 8s ease-in-out infinite;
            }
            
            .drone-container-game {
              position: absolute;
              left: ${dronePosition.x}px;
              top: ${dronePosition.y}px;
              transform: translate(-50%, -50%);
              z-index: 2;
              transition: none; /* Sin transición CSS, usamos animación manual */
            }
            
            .drone {
              animation: bounce 2s ease-in-out infinite, tilt 3s ease-in-out infinite;
            }
            
            .drone-body {
              position: relative;
              width: 40px;
              height: 40px;
            }
            
            .drone-center {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 20px;
              height: 20px;
              background: linear-gradient(45deg, #ff8000, #ff6b35);
              border-radius: 4px;
              box-shadow: 0 2px 8px rgba(255, 128, 0, 0.3);
            }
            
            .propeller {
              position: absolute;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: rgba(255, 128, 0, 0.1);
              border: 2px solid #ff8000;
            }
            
            .propeller-1 { top: -4px; left: -4px; animation: spin 0.1s linear infinite; }
            .propeller-2 { top: -4px; right: -4px; animation: spin 0.1s linear infinite reverse; }
            .propeller-3 { bottom: -4px; left: -4px; animation: spin 0.1s linear infinite reverse; }
            .propeller-4 { bottom: -4px; right: -4px; animation: spin 0.1s linear infinite; }
            
            .blade {
              position: absolute;
              background: #ff8000;
              border-radius: 10px;
              opacity: 0.6;
            }
            
            .blade-1 {
              top: 50%;
              left: 4px;
              right: 4px;
              height: 1px;
              transform: translateY(-50%);
            }
            
            .blade-2 {
              left: 50%;
              top: 4px;
              bottom: 4px;
              width: 1px;
              transform: translateX(-50%);
            }
            
            .drone-trail {
              animation: trailDraw 8s ease-in-out infinite;
              stroke-dasharray: 0, 1000;
            }
            
            @keyframes flyAcross {
              0% { 
                left: -60px;
                transform: translateY(-50%) rotate(0deg) scale(0.8);
              }
              15% {
                transform: translateY(-65%) rotate(15deg) scale(1);
              }
              30% {
                transform: translateY(-35%) rotate(-10deg) scale(1.1);
              }
              45% {
                transform: translateY(-60%) rotate(20deg) scale(0.9);
              }
              60% {
                transform: translateY(-40%) rotate(-5deg) scale(1.05);
              }
              75% {
                transform: translateY(-50%) rotate(10deg) scale(1);
              }
              100% { 
                left: calc(100% + 60px);
                transform: translateY(-50%) rotate(0deg) scale(0.8);
              }
            }
            
            @keyframes bounce {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
            
            @keyframes tilt {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(8deg); }
              75% { transform: rotate(-8deg); }
            }
            
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes trailDraw {
              0% { stroke-dasharray: 0, 1000; opacity: 0; }
              10% { opacity: 0.6; }
              20% { stroke-dasharray: 200, 1000; }
              80% { stroke-dasharray: 800, 1000; opacity: 0.6; }
              100% { stroke-dasharray: 1000, 1000; opacity: 0; }
            }
            
            /* Game Mode Animations */
            .planning-curve {
              stroke-dasharray: 10, 5;
              animation: planningCurve 3s ease-in-out;
            }
            
            .game-trail-curve {
              stroke-dasharray: 5, 5;
              animation: trailMoveCurve 3s ease-in-out;
            }
            
            .game-trail-active {
              stroke-dasharray: 5, 5;
              animation: trailActive 1s ease-in-out infinite;
            }
            
            .target-pulse {
              animation: targetPulse 0.5s ease-in-out infinite alternate;
            }
            
            .target-reached {
              animation: targetReached 0.5s ease-out;
            }
            
            .target-waiting {
              animation: targetWaiting 2s ease-in-out infinite;
            }
            
            .target-active {
              animation: targetActive 1s ease-in-out infinite;
            }
            
            .target-completed {
              animation: targetCompleted 0.5s ease-out;
            }
            
            @keyframes planningCurve {
              0% { 
                stroke-dasharray: 0, 1000; 
                opacity: 0.3; 
              }
              30% { 
                stroke-dasharray: 300, 1000; 
                opacity: 0.8; 
              }
              100% { 
                stroke-dasharray: 1000, 1000; 
                opacity: 0.6; 
              }
            }
            
            @keyframes trailMoveCurve {
              0% { 
                stroke-dasharray: 1000, 1000; 
                opacity: 0.6; 
              }
              100% { 
                stroke-dasharray: 1000, 1000; 
                opacity: 0.4; 
              }
            }
            
            @keyframes targetPulse {
              0% { r: 4; opacity: 0.8; }
              100% { r: 8; opacity: 0.4; }
            }
            
            @keyframes targetReached {
              0% { r: 6; opacity: 0.8; }
              50% { r: 12; opacity: 1; }
              100% { r: 6; opacity: 0.8; }
            }
            
            @keyframes trailActive {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
            
            @keyframes targetWaiting {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 0.8; }
            }
            
            @keyframes targetActive {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
            
            @keyframes targetCompleted {
              0% { opacity: 0.8; }
              50% { opacity: 0.4; }
              100% { opacity: 0.6; }
            }
            
            /* Mobile Responsive */
            @media (max-width: 768px) {
              .drone-container {
                animation: flyAcrossMobile 6s ease-in-out infinite;
              }
              
              .drone-body {
                width: 30px;
                height: 30px;
              }
              
              .drone-center {
                width: 15px;
                height: 15px;
              }
              
              .propeller {
                width: 12px;
                height: 12px;
              }
              
              @keyframes flyAcrossMobile {
                0% { 
                  left: -40px;
                  transform: translateY(-50%) rotate(0deg) scale(0.7);
                }
                15% {
                  transform: translateY(-60%) rotate(15deg) scale(0.9);
                }
                30% {
                  transform: translateY(-40%) rotate(-10deg) scale(1);
                }
                45% {
                  transform: translateY(-55%) rotate(20deg) scale(0.8);
                }
                60% {
                  transform: translateY(-45%) rotate(-5deg) scale(0.95);
                }
                75% {
                  transform: translateY(-50%) rotate(10deg) scale(0.9);
                }
                100% { 
                  left: calc(100% + 40px);
                  transform: translateY(-50%) rotate(0deg) scale(0.7);
                }
              }
            }
          `
        }} />
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