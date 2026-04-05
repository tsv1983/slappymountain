import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GameWorld } from "../../world/GameWorld";

function Fallback3D() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#f472b6" wireframe />
    </mesh>
  );
}

export function GameCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 28, 22], fov: 48, near: 0.1, far: 500 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={<Fallback3D />}>
        <GameWorld />
      </Suspense>
    </Canvas>
  );
}
