'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Animation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Capturando a referência atual em uma variável local
    const mountNode = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountNode.clientWidth / mountNode.clientHeight, 
      0.1, 
      1000
    );
    
    // Renderer setup - usando preserveDrawingBuffer para melhor compatibilidade
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    rendererRef.current = renderer;
    
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Limpar elemento anterior se existir
    while (mountNode.firstChild) {
      mountNode.removeChild(mountNode.firstChild);
    }
    
    // Adicionar o novo canvas
    mountNode.appendChild(renderer.domElement);
    
    // Create cube
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    
    // Material mais atraente com reflexo
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x00ffaa,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x004422,
      emissiveIntensity: 0.2
    });
    
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);
    
    // Adicionar luz para o material MeshStandardMaterial
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    camera.position.z = 10;
    
    // Animation loop - implementação de RAF mais confiável
    let lastTime = 0;
    const animate = (time = 0) => {
      if (!cubeRef.current || !rendererRef.current || !sceneRef.current) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Rotação suave, independente do framerate
      const rotationSpeed = 0.001;
      cubeRef.current.rotation.x += rotationSpeed * deltaTime;
      cubeRef.current.rotation.y += rotationSpeed * deltaTime;
      
      rendererRef.current.render(sceneRef.current, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!rendererRef.current) return;
      
      const width = mountNode.clientWidth;
      const height = mountNode.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      // Parar a animação
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      window.removeEventListener('resize', handleResize);
      
      // Limpar recursos
      geometry.dispose();
      material.dispose();
      
      // Limpar o renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      // Limpar a cena
      if (sceneRef.current) {
        while(sceneRef.current.children.length > 0) { 
          const object = sceneRef.current.children[0];
          sceneRef.current.remove(object);
        }
        sceneRef.current = null;
      }
      
      // Limpar o elemento DOM usando a variável local capturada
      if (mountNode) {
        while (mountNode.firstChild) {
          mountNode.removeChild(mountNode.firstChild);
        }
      }
      
      // Limpar a referência do cubo
      cubeRef.current = null;
    };
  }, []);
  
  return <div ref={mountRef} className="w-full h-64 md:h-80" />;
};

export default Animation;