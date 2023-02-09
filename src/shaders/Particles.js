import { useRef } from "react";
import * as THREE from "three";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

function SandParticle() {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef}>
      <planeBufferGeometry attach="geometry" args={[0.1, 0.1]} />
      <meshBasicMaterial attach="material" color="#ffffff" />
    </mesh>
  );
}

export default function Particles() {
  const [windForce] = useState(new THREE.Vector3(1, 0, 0));
  const [particles, setParticles] = useState([]);

  useFrame(() => {
    windForce.x = Math.sin(Date.now() * 0.001) * 10;
    setParticles(
      particles.map((particle) => ({
        ...particle,
        position: particle.position.add(windForce.clone().multiplyScalar(0.01)),
      }))
    );
  });

  // Generate the particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      position: new THREE.Vector3(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      ),
    });
  }

  return (
    <group>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <planeBufferGeometry attach="geometry" args={[0.1, 0.1]} />
          <meshBasicMaterial attach="material" color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}
