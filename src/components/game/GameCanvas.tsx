import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GameWorld } from "../../world/GameWorld";

function Fallback3D() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#a53a28" wireframe />
    </mesh>
  );
}

export function GameCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 34, 26], fov: 42, near: 0.1, far: 400 }}
      gl={{
        antialias: true,
        toneMapping: 4,
        toneMappingExposure: 1.05,
      }}
    >
      <Suspense fallback={<Fallback3D />}>
        <GameWorld />
      </Suspense>
    </Canvas>
  );
}
