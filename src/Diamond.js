import React, { useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Leva, useControls } from 'leva'

export default function Diamond() {
  
  const statueRef = useRef();
  const config = useControls({
   
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 4, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 1, min: 0, max: 1 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.69, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 1.0, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.2, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 2.19, min: 0, max: 10, step: 0.01 },
    attenuationColor: '#ffffff',
    color: '#f200ff',
    bg: '#6300ff',
    
  })
  const { nodes, materials } = useGLTF('/diamond.glb')
  return (
    
    <group dispose={null}>
      
      <mesh geometry={nodes.diamond1.geometry} castShadow
        receiveShadow position={[-0.25, 1.1, 0]} scale={0.3} rotation={[Math.PI / 5, 0, 0]}>
        {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />}
      </mesh>
      <mesh
      
        
        geometry={nodes.diamond1.geometry}
        side={THREE.FrontSide}
        material={materials.Diamond}
        position={[-0.25, 1.1, 0]}
        rotation={[Math.PI / 5, 0, 0]}
        ref={statueRef}
        scale={0.2}
        
      >
        
      </mesh>
    </group>
    
  );
}

useGLTF.preload("/diamond.glb");
