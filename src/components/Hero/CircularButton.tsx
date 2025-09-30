import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CircularButtonProps {
  text?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
  buttonX?: any;
  buttonY?: any;
}

// Funzione per normalizzare la rotazione e prendere il percorso più breve
const normalizeAngle = (current: number, target: number) => {
  let diff = target - current;
  
  // Normalizza la differenza tra -180 e 180
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  
  return current + diff;
};

const CircularButton: React.FC<CircularButtonProps> = ({
  text = "SCOPRI LA GALLERIA",
  onClick,
  buttonRef,
  isHovered = false,
  setIsHovered,
  buttonX,
  buttonY
}) => {
  const size = 128;
  const center = size / 2;
  const textRadius = 46;

  const [arrowRotation, setArrowRotation] = React.useState(-45);
  const [delayTimeout, setDelayTimeout] = React.useState<NodeJS.Timeout | null>(null);

  // Motion values per l'effetto magnetico
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  
  // Spring per rendere il movimento fluido
  const springConfig = { damping: 20, stiffness: 300 };
  const magneticSpringX = useSpring(magneticX, springConfig);
  const magneticSpringY = useSpring(magneticY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef?.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calcola l'angolo per la freccia
    const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const angleDeg = angleRad * (180 / Math.PI);
    setArrowRotation(prev => normalizeAngle(prev, angleDeg));

    // Effetto magnetico: sposta leggermente il bottone verso il mouse
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Limita il movimento a max 8px in ogni direzione
    const maxMove = 8;
    const moveX = Math.max(-maxMove, Math.min(maxMove, distanceX * 0.15));
    const moveY = Math.max(-maxMove, Math.min(maxMove, distanceY * 0.15));
    
    magneticX.set(moveX);
    magneticY.set(moveY);
  };

  const handleMouseLeave = () => {
    setIsHovered?.(false);
    
    // Reset posizione magnetica
    magneticX.set(0);
    magneticY.set(0);
    
    // Delay di 300ms prima di far tornare la freccia alla posizione iniziale
    if (delayTimeout) {
      clearTimeout(delayTimeout);
    }
    
    const timeout = setTimeout(() => {
      setArrowRotation(prev => normalizeAngle(prev, -45));
    }, 300);
    
    setDelayTimeout(timeout);
  };

  React.useEffect(() => {
    return () => {
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
    };
  }, [delayTimeout]);

  const magneticAreaSize = size + 80; // Area magnetica più grande del bottone

  return (
    <div
      className="relative"
      style={{
        width: magneticAreaSize,
        height: magneticAreaSize,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered?.(true)}
        className="absolute group/btn focus:outline-none rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-0"
        style={{
          width: size,
          height: size,
          left: (magneticAreaSize - size) / 2,
          top: (magneticAreaSize - size) / 2,
          x: magneticSpringX,
          y: magneticSpringY,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
      {/* SVG per il testo rotante */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible', pointerEvents: 'none' }}
      >
        <defs>
          <path
            id="textCircle"
            d={`
              M ${center}, ${center}
              m -${textRadius}, 0
              a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0
              a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0
            `}
            fill="none"
          />
        </defs>
        
        <motion.g
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transformOrigin: `${center}px ${center}px`
          }}
        >
          <text
            className="text-[9px] font-bold tracking-[0.15em] uppercase fill-white"
            style={{ 
              letterSpacing: '0.15em',
              fontWeight: 700
            }}
          >
            <textPath
              href="#textCircle"
              startOffset="0%"
              textAnchor="start"
            >
              {text} • {text} •
            </textPath>
          </text>
        </motion.g>
      </svg>

      {/* Cerchio centrale con freccia - trasparente per ereditare il gradiente */}
      <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-transparent flex items-center justify-center">
        <motion.div
          animate={{
            rotate: arrowRotation,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          <ArrowRight className="w-6 h-6 text-white drop-shadow-lg" />
        </motion.div>
      </div>
    </motion.button>
    </div>
  );
};

export default CircularButton