import { Sky } from "@react-three/drei";
import { PALETTE } from "../config/palette";

export function WorldLighting() {
  return (
    <>
      <color attach="background" args={[PALETTE.skyBottom]} />
      <fog attach="fog" args={[PALETTE.skyBottom, 55, 190]} />
      <Sky sunPosition={[50, 80, 40]} turbidity={0.45} mieCoefficient={0.004} />
      <ambientLight intensity={0.65} />
      <directionalLight
        castShadow
        position={[40, 70, 28]}
        intensity={1.25}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-near={0.5}
        shadow-camera-far={240}
      />
      <hemisphereLight args={["#bae6fd", PALETTE.grassDark, 0.45]} />
      <pointLight position={[-30, 24, -20]} intensity={0.35} color="#fde68a" />
    </>
  );
}
