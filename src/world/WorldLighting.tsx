import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { PALETTE } from "../config/palette";
import { QUALITY } from "../config/quality";

export function WorldLighting() {
  const sz = QUALITY.shadowMapSize;

  return (
    <>
      <color attach="background" args={[PALETTE.bg]} />
      <fog attach="fog" args={[PALETTE.bg, 85, 175]} />

      <ambientLight intensity={0.35} color="#f5efe6" />

      <directionalLight
        castShadow
        position={[-35, 55, 30]}
        intensity={1.5}
        color="#fff5e8"
        shadow-mapSize-width={sz}
        shadow-mapSize-height={sz}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-camera-near={0.5}
        shadow-camera-far={200}
        shadow-bias={-0.0008}
        shadow-radius={3}
      />

      <hemisphereLight args={["#f5e8d8", "#6a6458", 0.4]} />

      <directionalLight position={[30, 20, -40]} intensity={0.2} color="#e8c890" />

      {QUALITY.contactShadows && (
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.35}
          scale={120}
          blur={2.5}
          far={12}
          resolution={512}
          color="#2a2420"
        />
      )}

      {QUALITY.environmentIBL && (
        <Suspense fallback={null}>
          <Environment preset="warehouse" background={false} />
        </Suspense>
      )}
    </>
  );
}
