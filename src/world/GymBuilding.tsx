import { Text } from "@react-three/drei";
import { useMemo } from "react";
import { PALETTE } from "../config/palette";

const TERRACOTTA = "#b45630";
const TERRACOTTA_DARK = "#8b3a1f";
const ROOF_PITCH = Math.atan2(4, 16);
const SLOPE_LEN = Math.sqrt(16 * 16 + 4 * 4);

function TerracottaRoof() {
  const tileRows = useMemo(() => {
    const rows: JSX.Element[] = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const t = (i + 1) / (count + 1);
      const localZ = -SLOPE_LEN / 2 + t * SLOPE_LEN;
      rows.push(
        <mesh key={`f${i}`} position={[0, 0.18, localZ]}>
          <boxGeometry args={[40, 0.12, 0.18]} />
          <meshStandardMaterial color={TERRACOTTA_DARK} roughness={0.8} />
        </mesh>
      );
    }
    return rows;
  }, []);

  return (
    <group position={[0, 7.5, 0]}>
      {/* Front slope */}
      <group position={[0, 2, 8]} rotation={[-ROOF_PITCH, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[40, 0.35, SLOPE_LEN]} />
          <meshStandardMaterial color={TERRACOTTA} roughness={0.72} />
        </mesh>
        {tileRows}
      </group>
      {/* Back slope */}
      <group position={[0, 2, -8]} rotation={[ROOF_PITCH, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[40, 0.35, SLOPE_LEN]} />
          <meshStandardMaterial color={TERRACOTTA} roughness={0.72} />
        </mesh>
        {tileRows}
      </group>
      {/* Ridge cap */}
      <mesh castShadow position={[0, 4, 0]}>
        <boxGeometry args={[41, 0.5, 1.2]} />
        <meshStandardMaterial color={TERRACOTTA_DARK} roughness={0.65} />
      </mesh>
      {/* Eave trim — front */}
      <mesh position={[0, 0.1, 16.2]}>
        <boxGeometry args={[41, 0.4, 0.6]} />
        <meshStandardMaterial color={TERRACOTTA_DARK} roughness={0.7} />
      </mesh>
      {/* Eave trim — back */}
      <mesh position={[0, 0.1, -16.2]}>
        <boxGeometry args={[41, 0.4, 0.6]} />
        <meshStandardMaterial color={TERRACOTTA_DARK} roughness={0.7} />
      </mesh>
      {/* Gable ends */}
      <mesh castShadow position={[-20.2, 2, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.4, 4.4, 1.6]} />
        <meshStandardMaterial color={PALETTE.gymWall} roughness={0.6} />
      </mesh>
      <mesh castShadow position={[20.2, 2, 0]}>
        <boxGeometry args={[0.4, 4.4, 1.6]} />
        <meshStandardMaterial color={PALETTE.gymWall} roughness={0.6} />
      </mesh>
    </group>
  );
}

/** Exterior shell — visible on the overworld only */
export function GymBuilding() {
  return (
    <group>
      {/* Plaza circle */}
      <mesh receiveShadow position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[24, 32]} />
        <meshStandardMaterial color={PALETTE.safeZone} roughness={0.75} />
      </mesh>
      {/* Path ring */}
      <mesh receiveShadow position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14, 22, 48]} />
        <meshStandardMaterial color={PALETTE.path} roughness={0.8} />
      </mesh>

      {/* Walls */}
      <mesh castShadow position={[0, 3.2, 0]}>
        <boxGeometry args={[34, 6.4, 26]} />
        <meshStandardMaterial color={PALETTE.gymWall} roughness={0.55} />
      </mesh>
      {/* Trim */}
      <mesh castShadow position={[0, 6.9, 0]}>
        <boxGeometry args={[36, 1.2, 28]} />
        <meshStandardMaterial color="#f9a8d4" roughness={0.45} />
      </mesh>
      {/* Pitched terracotta roof */}
      <TerracottaRoof />

      {/* Sign */}
      <mesh position={[0, 7.6, 13.05]}>
        <boxGeometry args={[12, 2.2, 0.4]} />
        <meshStandardMaterial color={PALETTE.sign} emissive="#facc15" emissiveIntensity={0.08} />
      </mesh>
      <Text
        position={[0, 7.6, 13.25]}
        fontSize={0.95}
        color={PALETTE.uiInk}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        POWER PEAK GYM
      </Text>
      <Text
        position={[0, 6.55, 13.25]}
        fontSize={0.42}
        color="#831843"
        anchorX="center"
        anchorY="middle"
      >
        {"Train \u2022 Break \u2022 Collect"}
      </Text>

      {/* Entrance facade + door */}
      <mesh castShadow position={[0, 1.8, 13.2]}>
        <boxGeometry args={[8, 3.6, 0.35]} />
        <meshStandardMaterial color="#fda4af" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.1, 13.4]}>
        <boxGeometry args={[5.5, 2.2, 0.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Glowing door prompt */}
      <Text
        position={[0, 2.6, 13.55]}
        fontSize={0.32}
        color="#22d3ee"
        anchorX="center"
      >
        Walk in to enter
      </Text>

      {/* Side accents */}
      <mesh castShadow position={[-16, 3.2, 0]}>
        <boxGeometry args={[1.2, 6.4, 26]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[16, 3.2, 0]}>
        <boxGeometry args={[1.2, 6.4, 26]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.55} />
      </mesh>

      {/* Step */}
      <mesh castShadow position={[0, 0.25, 13.5]}>
        <boxGeometry args={[18, 0.35, 2]} />
        <meshStandardMaterial color="#f472b6" roughness={0.45} />
      </mesh>

      {/* Pet shop kiosk */}
      <mesh position={[11, 1.4, 10]} castShadow>
        <boxGeometry args={[3.2, 2.8, 2.4]} />
        <meshStandardMaterial color="#fce7f3" roughness={0.5} />
      </mesh>
      <Text position={[11, 3.0, 11.3]} fontSize={0.32} color="#831843" anchorX="center">
        PET SHOP
      </Text>
    </group>
  );
}
