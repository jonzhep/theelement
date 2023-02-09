export const GrainyShader = {
  uniforms: {
    tDiffuse: { value: null },
    radius: { value: 1.0 },
    time: { value: 0.0 },
  },
  vertexShader: `
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                  }`,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float radius;
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      float distort = smoothstep(radius - 0.1, radius, dist + sin(time) * 0.1);
      vec4 color = texture2D(tDiffuse, vUv);
      if (distort > 0.0) {
        color = mix(color, vec4(1.0), distort);
        float angle = atan(vUv.y - center.y, vUv.x - center.x);
        float offset = distort * 0.5;
        color = texture2D(tDiffuse, vec2(vUv.x + cos(angle) * offset, vUv.y + sin(angle) * offset));
      }
      gl_FragColor = color;
                  }
  
    
  
// uniform sampler2D tDiffuse;
// uniform float time;
// uniform vec2 uResolution;
// varying vec2 vUv;

// void main() {
//   vec2 uv = vUv;
//   uv.y += sin(uv.x * 10.0 + time * 1.0) * 0.001;
//   uv.y += sin(uv.x * 15.0 + time * 1.5) * 0.001;
//   uv.y += sin(uv.x * 25.0 + time * 2.0) * 0.001;
//   uv.y += sin(uv.x * 50.0 + time * 2.5) * 0.001;
//   gl_FragColor = texture2D(tDiffuse, uv);
// }
                  `,
};
