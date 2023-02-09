import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

export default function Env(props) {
  let vec = new THREE.Vector3();
  let enterIncrement = 0;
  useFrame((state) => {
    enterIncrement = props.enterIncrement % 13;

    if (enterIncrement === 2) {
      state.camera.position.lerp(vec.set(0, 0, 5), 0.0001);
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 3) {
      state.camera.position.lerp(vec.set(5, 0, 2.5), 0.001);
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 4) {
      state.camera.position.lerp(vec.set(-5, 0, 2.5), 0.01);
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 5) {
      state.camera.position.lerp(
        vec.set(4, 0, 3),
        0.001
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 6) {
      state.camera.position.lerp(
        vec.set(0, 4, 8),
        0.005
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 7) {
      state.camera.position.lerp(
        vec.set(0, 1, 6),
        0.005
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 8) {
      state.camera.position.lerp(
        vec.set(0, -0.902270925328769, 7.929117645891684),
        0.005
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 9) {
      state.camera.position.lerp(
        vec.set(9, 1.52257694562051415, 1.19680788578111),
        0.01
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 10) {
      state.camera.position.lerp(
        vec.set(10.830953118825398, 0.6206651180632762, -0.40251601096885026),
        0.01
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 11) {
      state.camera.position.lerp(
        vec.set(-3, 0, 3),
        0.01
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 12) {
      state.camera.position.lerp(
        vec.set(0, 0, 500),
        0.001
      );
      state.camera.lookAt(0, 0, 0);
    }
  });

  return <Environment preset={"night"} background blur={1} opacity={0.9} />;
}

