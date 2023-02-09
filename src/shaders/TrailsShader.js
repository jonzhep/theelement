import * as THREE from "three";

export const TrailsShader = {
  //   uniforms: {
  //     tDiffuse: { value: null },
  //     radius: { value: 0.5 },
  //     time: { value: 0.0 },
  //   },
  //   vertexShader: `
  //                 varying vec2 vUv;
  //                 void main() {
  //                   vUv = uv;
  //                   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  //                 }`,
  //   fragmentShader: `
  //   uniform sampler2D tDiffuse;
  //   uniform float radius;
  //   uniform float time;
  //   varying vec2 vUv;
  //   void main() {
  //     vec2 center = vec2(0.5, 0.5);
  //     float dist = distance(vUv, center);
  //     float distort = smoothstep(radius - 0.1, radius, dist + sin(time) * 0.1);
  //     vec4 color = texture2D(tDiffuse, vUv);
  //     if (distort > 0.0) {
  //       color = mix(color, vec4(1.0), distort);
  //       float angle = atan(vUv.y - center.y, vUv.x - center.x);
  //       float offset = distort * 0.5;
  //       color = texture2D(tDiffuse, vec2(vUv.x + cos(angle) * offset, vUv.y + sin(angle) * offset));
  //     }
  //     gl_FragColor = color;
  //                 }`,

  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 },
    affect: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float affect;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      float angle = atan(vUv.y - center.y , vUv.x - center.x );
    //   float offset = sin(time * 0.5 + dist * 10.0 + angle * 1.0) * 0.0075 * affect ;
      float offset = sin(time * 0.5 + dist * -20.0 + angle * 1.0) * 0.15 * affect ;

      color = mix(color, texture2D(tDiffuse, vUv + vec2(offset)), 0.1 );
      gl_FragColor = color;
    }
  `,
};
