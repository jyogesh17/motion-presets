import React, { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  count?: number;
  interactive?: boolean;
  gravity?: boolean;
  connection?: boolean;
  connectionDistance?: number;
  colorScheme?: 'rainbow' | 'monochrome' | 'gradient' | 'neon';
  followMouse?: boolean;
  explosion?: boolean;
  className?: string;
}

/**
 * Advanced particle field with physics, connections, and interactions
 * Creates stunning visual effects like in crypto/tech websites
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 100,
  interactive = true,
  gravity = false,
  connection = true,
  connectionDistance = 100,
  colorScheme = 'neon',
  followMouse = false,
  explosion = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const animationRef = useRef<number>();

  const getColor = (index: number, life: number, maxLife: number) => {
    const lifeRatio = life / maxLife;
    
    switch (colorScheme) {
      case 'rainbow':
        return `hsla(${(index * 360 / count) % 360}, 70%, 50%, ${lifeRatio})`;
      case 'monochrome':
        return `rgba(120, 119, 198, ${lifeRatio})`;
      case 'gradient':
        const hue = 250 + (index * 60 / count);
        return `hsla(${hue}, 80%, 60%, ${lifeRatio})`;
      case 'neon':
        const neonColors = [
          `rgba(0, 255, 255, ${lifeRatio})`,
          `rgba(255, 0, 255, ${lifeRatio})`,
          `rgba(255, 255, 0, ${lifeRatio})`,
          `rgba(0, 255, 128, ${lifeRatio})`,
        ];
        return neonColors[index % neonColors.length];
      default:
        return `rgba(255, 255, 255, ${lifeRatio})`;
    }
  };

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = explosion ? 5 + Math.random() * 5 : 0.5 + Math.random() * 1;
      
      newParticles.push({
        id: i,
        x: explosion ? rect.width / 2 : Math.random() * rect.width,
        y: explosion ? rect.height / 2 : Math.random() * rect.height,
        vx: explosion ? Math.cos(angle) * velocity : (Math.random() - 0.5) * 2,
        vy: explosion ? Math.sin(angle) * velocity : (Math.random() - 0.5) * 2,
        size: 2 + Math.random() * 4,
        color: getColor(i, 1, 1),
        life: 1,
        maxLife: 1,
      });
    }
    
    setParticles(newParticles);
  }, [count, explosion, colorScheme]);

  // Set initial canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure canvas has proper dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || 500;
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      
      // Only update canvas size if dimensions changed
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const mouseXValue = springMouseX.get();
      const mouseYValue = springMouseY.get();
      
      // Update and draw particles
      setParticles(prevParticles => {
        const updated = prevParticles.map(particle => {
          let { x, y, vx, vy, life } = particle;
          
          // Apply physics
          if (gravity) {
            vy += 0.1;
          }
          
          // Mouse interaction
          if (interactive && followMouse) {
            const dx = mouseXValue - x;
            const dy = mouseYValue - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
              const force = (200 - distance) / 200;
              vx += (dx / distance) * force * 0.5;
              vy += (dy / distance) * force * 0.5;
            }
          }
          
          // Update position
          x += vx;
          y += vy;
          
          // Bounce off walls
          if (x < 0 || x > canvas.width) {
            vx *= -0.8;
            x = Math.max(0, Math.min(canvas.width, x));
          }
          if (y < 0 || y > canvas.height) {
            vy *= -0.8;
            y = Math.max(0, Math.min(canvas.height, y));
          }
          
          // Apply friction
          vx *= 0.99;
          vy *= 0.99;
          
          // Update life (for explosion effect)
          if (explosion) {
            life -= 0.01;
          }
          
          return { ...particle, x, y, vx, vy, life };
        });
        
        // Draw connections
        if (connection) {
          ctx.strokeStyle = 'rgba(120, 119, 198, 0.1)';
          ctx.lineWidth = 1;
          
          for (let i = 0; i < updated.length; i++) {
            for (let j = i + 1; j < updated.length; j++) {
              const dx = updated[i].x - updated[j].x;
              const dy = updated[i].y - updated[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < connectionDistance) {
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(120, 119, 198, ${opacity * 0.2})`;
                ctx.beginPath();
                ctx.moveTo(updated[i].x, updated[i].y);
                ctx.lineTo(updated[j].x, updated[j].y);
                ctx.stroke();
              }
            }
          }
        }
        
        // Draw particles
        updated.forEach((particle, index) => {
          ctx.fillStyle = getColor(index, particle.life, particle.maxLife);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow effect
          if (colorScheme === 'neon') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
        
        return updated;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gravity, interactive, followMouse, connection, connectionDistance, explosion, colorScheme, springMouseX, springMouseY]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [interactive, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-field ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    />
  );
};