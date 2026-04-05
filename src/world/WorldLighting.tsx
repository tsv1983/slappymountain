import { PALETTE } from "../config/palette";

export function WorldLighting() {
  return (
    <>
      <color attach="background" args={[PALETTE.bg]} />
      <fog attach="fog" args={[PALETTE.bg, 90, 180]} />

      <ambientLight intensity={0.4} color="#f5efe6" />

      {/* Key light — strong directional from upper-left like the reference */}
      <directionalLight
        castShadow
        position={[-35, 55, 30]}
        intensity={1.6}
        color="#fff5e8"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-camera-near={0.5}
        shadow-camera-far={200}
        shadow-bias={-0.001}
      />

      {/* Warm fill from below — keeps undersides readable */}
      <hemisphereLight args={["#f5e8d8", "#8a8474", 0.35]} />

      {/* Subtle warm backlight for depth */}
      <directionalLight position={[30, 20, -40]} intensity={0.25} color="#e8c890" />
    </>
  );
}
