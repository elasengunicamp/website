import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Partículas "recortes de papel rasgado" flutuando no hero — elemento
// interativo/artístico pedido em NOTES.md ("elementos interativos e
// artísticos, partículas"). Ilha React (client:visible), só monta quando o
// hero entra na viewport. Progressive enhancement: o hero já tem uma
// decoração estática em CSS (ver index.astro); isso aqui só adiciona
// movimento por cima quando o dispositivo permite (sem prefers-reduced-motion
// e com WebGL disponível).

const BRAND_COLORS = ['#4c0062', '#ac58c4', '#f8dfff', '#d9657e', '#6793c7', '#167c82'];

// PRNG determinístico simples (mulberry32) — evita variar o layout das
// partículas a cada render/hydration.
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Geometria de "estilhaço" de papel: polígono irregular com poucos lados,
// gerado por instância pra não parecer um confete perfeitamente redondo.
function tornShardGeometry(random: () => number) {
  const sides = 5 + Math.floor(random() * 2);
  const shape = new THREE.Shape();
  const baseRadius = 0.45;
  for (let i = 0; i <= sides; i += 1) {
    const angle = (i / sides) * Math.PI * 2;
    const jitter = 0.7 + random() * 0.5;
    const x = Math.cos(angle) * baseRadius * jitter;
    const y = Math.sin(angle) * baseRadius * jitter;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  return new THREE.ShapeGeometry(shape);
}

interface ShardData {
  position: [number, number, number];
  rotationZ: number;
  scale: number;
  color: string;
  speed: number;
  seed: number;
}

function Shard({ position, rotationZ, scale, color, speed, seed }: ShardData) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => tornShardGeometry(mulberry32(seed)), [seed]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + seed;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t) * 0.5;
      ref.current.position.x = position[0] + Math.cos(t * 0.6) * 0.25;
      ref.current.rotation.z = rotationZ + Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, 0, rotationZ]} scale={scale} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Scene({ count }: { count: number }) {
  const shards = useMemo<ShardData[]>(() => {
    const random = mulberry32(7);
    return Array.from({ length: count }, (_, i) => ({
      position: [(random() - 0.5) * 11, (random() - 0.5) * 6, (random() - 0.5) * 3] as [number, number, number],
      rotationZ: random() * Math.PI * 2,
      scale: 0.35 + random() * 0.6,
      color: BRAND_COLORS[i % BRAND_COLORS.length],
      speed: 0.15 + random() * 0.25,
      seed: i * 13 + 1,
    }));
  }, [count]);

  return (
    <>
      {shards.map((shard) => (
        <Shard key={shard.seed} {...shard} />
      ))}
    </>
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export interface ParticleHeroProps {
  count?: number;
}

export default function ParticleHero({ count = 22 }: ParticleHeroProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !supportsWebGL()) return;
    setEnabled(true);
  }, []);

  // Sem motion/WebGL: não renderiza nada — a decoração estática em CSS do
  // hero (index.astro) continua visível por baixo, sem "buraco" na tela.
  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Scene count={count} />
      </Canvas>
    </div>
  );
}
