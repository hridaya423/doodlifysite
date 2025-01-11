'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pen, Eraser, Mouse, Share2, Grid, UndoIcon } from 'lucide-react';

interface FeatureCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const Bg: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('doodleCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawDoodle = () => {
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
      ctx.lineWidth = Math.random() * 2 + 1;
      
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      
      const points = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < points; i++) {
        const radius = Math.random() * 100 + 50;
        const angle = Math.random() * Math.PI * 2;
        
        const cp1x = x + Math.cos(angle) * radius;
        const cp1y = y + Math.sin(angle) * radius;
        const cp2x = x + Math.cos(angle + 0.5) * radius;
        const cp2y = y + Math.sin(angle + 0.5) * radius;
        const endx = x + Math.cos(angle + 1) * radius;
        const endy = y + Math.sin(angle + 1) * radius;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endx, endy);
      }
      
      ctx.stroke();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.03) drawDoodle();

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      id="doodleCanvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, rotate: isHovered ? 2 : 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden border border-gray-700"
    >
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 opacity-5"
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Icon className="w-full h-full text-blue-400" />
      </motion.div>
      
      <motion.div 
        className="flex items-center mb-4"
        animate={{ x: isHovered ? 10 : 0 }}
      >
        <Icon className="w-6 h-6 text-blue-400 mr-2" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </motion.div>
      <p className="text-gray-300 relative z-10">{description}</p>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <Bg />
      
      <header className="relative pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{
                rotateY: mousePosition.x / 50,
                rotateX: -mousePosition.y / 50,
              }}
              transition={{ type: "spring", stiffness: 100 }}
              className="perspective"
            >
              <img 
                src="/logo.png" 
                alt="Doodlify Logo" 
                className="w-24 h-24 mx-auto mb-8 hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
            <motion.h1 
              className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
              animate={{
                backgroundPosition: [`0% 50%`, `100% 50%`],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Welcome to Doodlify
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8">
              Express your creativity with our intuitive doodling extension
            </p>
            <a href="https://chromewebstore.google.com/detail/doodlify/hdaanjheppnaodekeagjfjdnhnofigfp?authuser=8&hl=en-GB" >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">Start Drawing</span>
              <motion.div
                className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </motion.button>
            </a>
          </motion.div>
        </div>
      </header>
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-white"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              Icon={Pen}
              title="Drawing Tools"
              description="Multiple tools including pen, shapes, and eraser for all your creative needs"
            />
            <FeatureCard
              Icon={Grid}
              title="Grid System"
              description="Precision grid overlay for accurate drawings and alignments"
            />
            <FeatureCard
              Icon={Share2}
              title="Easy Sharing"
              description="Share your creations instantly with built-in export options"
            />
            <FeatureCard
              Icon={Mouse}
              title="Intuitive Interface"
              description="Clean, simple interface that gets out of your way"
            />
            <FeatureCard
              Icon={UndoIcon}
              title="Undo/Redo"
              description="Multiple undo levels to experiment freely"
            />
            <FeatureCard
              Icon={Eraser}
              title="Advanced Tools"
              description="Professional features in a simple package"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)',
            backgroundSize: '400% 400%',
          }}
        />
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Ready to start creating?
          </motion.h2>
          <p className="text-xl mb-8 opacity-90">
            No sign-up required. Start drawing instantly.
          </p>
          <a href="https://chromewebstore.google.com/detail/doodlify/hdaanjheppnaodekeagjfjdnhnofigfp?authuser=8&hl=en-GB">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Install Now!
          </motion.button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
