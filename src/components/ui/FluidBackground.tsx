"use client";

import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FluidBackgroundProps {
  className?: string;
  fallback?: ReactNode;
}

// ---------- GLSL sources ----------

const VERT_SRC = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG_SRC = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

// ----- Simplex 3D noise (Ashima / Ian McEwan) -----
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
// ----- end noise -----

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution;

  // Layered FBM noise
  float n1 = snoise(vec3(uv * 3.0, u_time * 0.15));
  float n2 = snoise(vec3(uv * 5.0 + 10.0, u_time * 0.1));
  float n3 = snoise(vec3(uv * 2.0 - mouse * 0.5, u_time * 0.08));

  // Mouse influence — subtle warp near cursor
  float mouseDist = length(uv - mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;

  // Palette
  vec3 darkBase = vec3(0.043, 0.067, 0.1);        // #0B1120
  vec3 orange   = vec3(0.976, 0.451, 0.086);       // #F97316
  vec3 blue     = vec3(0.145, 0.388, 0.922);       // #2563EB
  vec3 highlight = vec3(0.886, 0.91, 0.941);       // subtle white

  vec3 col = darkBase;
  col += orange   * smoothstep(0.2, 0.8, n1 + mouseInfluence) * 0.15;
  col += blue     * smoothstep(0.3, 0.9, n2) * 0.12;
  col += highlight * smoothstep(0.5, 1.0, n3) * 0.05;

  // Vignette
  float vignette = smoothstep(1.4, 0.5, length(uv - 0.5) * 1.8);
  col *= vignette;

  fragColor = vec4(col, 1.0);
}`;

// WebGL1 fallback shaders
const VERT_SRC_V1 = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG_SRC_V1 = `
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

// ----- Simplex 3D noise (Ashima / Ian McEwan) -----
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
// ----- end noise -----

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution;

  float n1 = snoise(vec3(uv * 3.0, u_time * 0.15));
  float n2 = snoise(vec3(uv * 5.0 + 10.0, u_time * 0.1));
  float n3 = snoise(vec3(uv * 2.0 - mouse * 0.5, u_time * 0.08));

  float mouseDist = length(uv - mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;

  vec3 darkBase = vec3(0.043, 0.067, 0.1);
  vec3 orange   = vec3(0.976, 0.451, 0.086);
  vec3 blue     = vec3(0.145, 0.388, 0.922);
  vec3 highlight = vec3(0.886, 0.91, 0.941);

  vec3 col = darkBase;
  col += orange   * smoothstep(0.2, 0.8, n1 + mouseInfluence) * 0.15;
  col += blue     * smoothstep(0.3, 0.9, n2) * 0.12;
  col += highlight * smoothstep(0.5, 1.0, n3) * 0.05;

  float vignette = smoothstep(1.4, 0.5, length(uv - 0.5) * 1.8);
  col *= vignette;

  gl_FragColor = vec4(col, 1.0);
}`;

// ---------- helpers ----------

function compileShader(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  type: number,
  src: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  vertSrc: string,
  fragSrc: string
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  // Shaders are linked — safe to detach / delete
  gl.detachShader(program, vs);
  gl.detachShader(program, fs);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  return program;
}

// ---------- component ----------

export default function FluidBackground({ className, fallback }: FluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  // Mutable refs to avoid re-renders
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    mouseRef.current = {
      x: (e.clientX - rect.left) * dpr,
      y: (rect.height - (e.clientY - rect.top)) * dpr, // flip Y for GL
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect touch-only devices — skip WebGL there
    const isTouchOnly =
      "ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches;
    if (isTouchOnly) {
      setWebglSupported(false);
      return;
    }

    // Try WebGL2 first, then WebGL1
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null =
      canvas.getContext("webgl2", { alpha: false, antialias: false, powerPreference: "low-power" });
    let isWebGL2 = !!gl;

    if (!gl) {
      gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
      isWebGL2 = false;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    setWebglSupported(true);

    const vertSrc = isWebGL2 ? VERT_SRC : VERT_SRC_V1;
    const fragSrc = isWebGL2 ? FRAG_SRC : FRAG_SRC_V1;

    const program = createProgram(gl, vertSrc, fragSrc);
    if (!program) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const posAttr = gl.getAttribLocation(program, "position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    // Reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Sizing
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Mouse tracking
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    let hidden = document.hidden;
    let lastTimestamp = 0;

    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden) lastTimestamp = 0; // reset delta on return
    };
    document.addEventListener("visibilitychange", onVisibility);

    const frame = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(frame);
      if (hidden) return;

      const delta = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0;
      lastTimestamp = timestamp;

      if (!prefersReducedMotion) {
        time += delta;
      }

      gl!.uniform1f(uTime, time);
      gl!.uniform2f(uResolution, canvas.width, canvas.height);
      gl!.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    };

    rafRef.current = requestAnimationFrame(frame);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();

      // Free WebGL resources
      gl!.deleteBuffer(buf);
      gl!.deleteProgram(program);
      const ext = gl!.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
  }, [handleMouseMove]);

  // Touch-only or no WebGL — render fallback
  if (webglSupported === false) {
    return <>{fallback}</>;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
        style={{ willChange: "auto" }}
        aria-hidden="true"
      />
      {/* Show fallback while we detect WebGL (null state) so there's no flash */}
      {webglSupported === null && fallback}
    </>
  );
}
