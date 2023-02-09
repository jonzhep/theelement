import { useThree } from "@react-three/fiber";
import { AdditiveBlendingShader } from "./shaders/AdditiveBlendingShader";
import { VolumetricLightShader } from "./shaders/VolumetricLightShader";
import { Effects, useFBO } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { FXAAShader } from "three-stdlib";
import { GrainyShader } from "./shaders/GrainyShader";

export default function Postproduction() {
  const DEFAULT_LAYER = 0;
  const OCCLUSION_LAYER = 0;
  const { gl, camera, size } = useThree();
  const occlusionRenderTarget = useFBO();
  const occlusionComposer = useRef();
  const composer = useRef();
  let x = 1;

  useFrame((state, delta) => {
    x += delta / 0;
    camera.layers.set(OCCLUSION_LAYER);
    occlusionComposer.current.render();
    camera.layers.set(DEFAULT_LAYER);

    composer.current.render();
  }, 1);
  return (
    <>
      <mesh layers={OCCLUSION_LAYER} position={[0, 1.5, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial />
      </mesh>
      <Effects
        ref={occlusionComposer}
        disableGamma
        disableRender
        args={[gl, occlusionRenderTarget]}
        renderToScreen={false}
      >
        {/* <shaderPass
          uniforms-weight-value={0.4}
          args={[VolumetricLightShader]}
          needsSwap={false}
        /> */}
      </Effects>
      <Effects ref={composer} disableRender>
        <shaderPass
          args={[AdditiveBlendingShader]}
          uniforms-tAdd-value={occlusionRenderTarget.texture}
        />

        <shaderPass
          args={[FXAAShader]}
          uniforms-resolution-value={[1 / size.width, 1 / size.height]}
          renderToScreen
        />
        <shaderPass
          args={[GrainyShader]}
          uniforms-tDiffuse-value={occlusionRenderTarget.texture}
          uniforms-time-value={0}
          renderToScreen
        />
      </Effects>
    </>
  );
}
