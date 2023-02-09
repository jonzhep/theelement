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
      state.camera.position.lerp(vec.set(0, 3, 15), 0.01);
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 3) {
      state.camera.position.lerp(vec.set(15, 0, 12.5), 0.01);
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 4) {
      state.camera.position.lerp(vec.set(-15, 0, 12.5), 0.01);
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 5) {
      state.camera.position.lerp(
        vec.set(-6.0358791643389145, 3.028888268496038, 6.405432772282838),
        0.01
      );
      state.camera.lookAt(0, 1, 0);
    }
    if (enterIncrement === 6) {
      state.camera.position.lerp(
        vec.set(5.248097238306234, 2.5015889415213106, 5.4666839498488295),
        0.01
      );
      state.camera.lookAt(0, 1, 0);
    }
    if (enterIncrement === 7) {
      state.camera.position.lerp(
        vec.set(0, 4.332061055971331, 6.700236003219422),
        0.01
      );
      state.camera.lookAt(0, 1, 0);
    }
    if (enterIncrement === 8) {
      state.camera.position.lerp(
        vec.set(0, -0.902270925328769, 7.929117645891684),
        0.01
      );
      state.camera.lookAt(0, 1, 0);
    }
    if (enterIncrement === 9) {
      state.camera.position.lerp(
        vec.set(0, 2.522576945620514e-15, 41.19680788578111),
        0.01
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 10) {
      state.camera.position.lerp(
        vec.set(10.830953118825398, 0.6206651180632762, -0.40251601096885026),
        0.01
      );
      state.camera.lookAt(0, 1, 0);
    }
    if (enterIncrement === 11) {
      state.camera.position.lerp(
        vec.set(0, -0.902270925328769, 7.929117645891684),
        0.01
      );
      state.camera.lookAt(0, 0, 0);
    }
    if (enterIncrement === 12) {
      state.camera.position.lerp(
        vec.set(-10.830953118825398, 0.6206651180632762, -0.40251601096885026),
        0.01
      );
      state.camera.lookAt(0, 1, 0);
    }
  });

  return <Environment preset={"night"} background blur={1.75} opacity={0.9} />;
}

