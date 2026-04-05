import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, SMAA } from "@react-three/postprocessing";
import { QUALITY } from "../../config/quality";
import { GameWorld } from "../../world/GameWorld";

function Fallback3D() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#a53a28" wireframe />
    </mesh>
  );
}

function PostStack() {
  return (
    <EffectComposer multisampling={0}>
      {QUALITY.bloom && (
        <Bloom
          luminanceThreshold={0.75}
          luminanceSmoothing={0.3}
          intensity={0.35}
          mipmapBlur
        />
      )}
      {QUALITY.smaa && <SMAA />}
    </EffectComposer>
  );
}

export function GameCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, QUALITY.maxDpr]}
      camera={{ position: [4, 34, 26], fov: 42, near: 0.1, far: 400 }}
      gl={{
        antialias: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Suspense fallback={<Fallback3D />}>
        <GameWorld />
      </Suspense>
      <PostStack />
    </Canvas>
  );
}
