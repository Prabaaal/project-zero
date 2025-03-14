
import React, { useEffect, useRef } from 'react';

export const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create gradient background
    let hue = 250; // Purple-ish starting color
    
    const animate = () => {
      // Create gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      
      hue = (hue + 0.1) % 360;
      
      gradient.addColorStop(0, `hsl(${hue}, 80%, 15%)`); 
      gradient.addColorStop(0.5, `hsl(${(hue + 30) % 360}, 70%, 10%)`);
      gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 60%, 5%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some subtle floating particles
      const particleCount = 20;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.sin(Date.now() * 0.001 + i) * canvas.width * 0.5 + canvas.width * 0.5;
        const y = Math.cos(Date.now() * 0.001 + i) * canvas.height * 0.5 + canvas.height * 0.5;
        const size = Math.sin(Date.now() * 0.002 + i) * 3 + 3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};
