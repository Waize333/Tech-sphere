'use client';

import { useEffect, useRef } from 'react';

export function AnimatedGlowDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up any existing dots
    containerRef.current.innerHTML = '';
    
    // Create more dots with better visibility
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('div');
      dot.className = 'glow-dot absolute';
      
      // Adjusted random positioning for better coverage
      const size = Math.random() * 180 + 80; // Larger: between 80px and 260px
      const top = Math.random() * 100; 
      const left = Math.random() * 100;
      
      // Set dot properties
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.top = `${top}%`;
      dot.style.left = `${left}%`;
      
      // Random animation delay
      dot.style.animationDelay = `${Math.random() * 5}s`;
      
      // Create a stronger glow effect with custom color
      const hue = Math.random() * 60 + 200; // Blue to purple range
      dot.style.background = `radial-gradient(circle at center, hsla(${hue}, 80%, 60%, 0.8) 0%, hsla(${hue}, 80%, 60%, 0) 70%)`;
      
      containerRef.current.appendChild(dot);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return <div ref={containerRef} className="glow-dots" />;
}