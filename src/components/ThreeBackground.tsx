"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Animated WebGL backdrop:
 *  - a slowly morphing wireframe icosahedron
 *  - a drifting particle field
 *  - mouse + scroll parallax
 * Renders behind all content (see #bg-canvas in CSS).
 */
export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.06);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ---- Central wireframe shape ----
    const geo = new THREE.IcosahedronGeometry(2.6, 1);
    const wire = new THREE.WireframeGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff6b4a,
      transparent: true,
      opacity: 0.35,
    });
    const shape = new THREE.LineSegments(wire, lineMat);
    scene.add(shape);

    // glowing core
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7c5cff,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 0), coreMat);
    scene.add(core);

    // ---- Particle field ----
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 6 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf4f1ea,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ---- Interaction state ----
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollY = 0;

    const onPointer = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("pointermove", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ---- Render loop ----
    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      const t = clock.getElapsedTime();

      // ease mouse
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      if (!prefersReduced) {
        shape.rotation.x = t * 0.12 + mouse.y * 0.3;
        shape.rotation.y = t * 0.16 + mouse.x * 0.3;
        core.rotation.x = -t * 0.2;
        core.rotation.y = t * 0.25;
        particles.rotation.y = t * 0.02;
        particles.rotation.x = t * 0.01;
      }

      // gentle breathing scale
      const s = 1 + Math.sin(t * 0.8) * 0.04;
      shape.scale.setScalar(s);

      // parallax: camera drifts toward cursor + scroll pushes shape away
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      const depth = scrollY * 0.0015;
      shape.position.z = -depth * 4;
      core.position.z = -depth * 4;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      wire.dispose();
      lineMat.dispose();
      coreMat.dispose();
      core.geometry.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
      aria-hidden="true"
    />
  );
}
