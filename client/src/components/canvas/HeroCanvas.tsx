import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Create a particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // x, y, z position of each particle
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material with custom colors for different particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
    });
    
    // Create colors for particles
    const colors = new Float32Array(particlesCount * 3);
    
    const color1 = new THREE.Color('#B026FF'); // Neon Purple
    const color2 = new THREE.Color('#00FFFF'); // Electric Blue
    const color3 = new THREE.Color('#39FF14'); // Neon Green
    
    for (let i = 0; i < particlesCount; i++) {
      const colorIndex = i % 3;
      const color = colorIndex === 0 ? color1 : colorIndex === 1 ? color2 : color3;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Particles
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0
    };
    
    document.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0003;
      
      // Follow mouse with slight movement
      particlesMesh.rotation.x += mouse.y * 0.0003;
      particlesMesh.rotation.y += mouse.x * 0.0003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', animate);
      containerRef.current?.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
};

export default HeroCanvas;
