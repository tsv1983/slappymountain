import { Text } from "@react-three/drei";
import { useMemo } from "react";
import { PALETTE } from "../config/palette";

const P = PALETTE;
const ROOF_PITCH = Math.atan2(4.5, 16);
const SLOPE_LEN = Math.sqrt(16 * 16 + 4.5 * 4.5);

function TileRoof() {
  const rows = useMemo(() => {
    const r: JSX.Element[] = [];
    for (let i = 0; i < 8; i++) {
      const t = (i + 1) / 9;
      const z = -SLOPE_LEN / 2 + t * SLOPE_LEN;
      r.push(
        <mesh key={i} position={[0, 0.2, z]}>
          <boxGeometry args={[40, 0.1, 0.22]} />
          <meshStandardMaterial color={P.roofTileDark} roughness={0.85} />
        </mesh>
      );
    }
    return r;
  }, []);

  return (
    <group position={[0, 7.5, 0]}>
      <group position={[0, 2.2, 8]} rotation={[-ROOF_PITCH, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[40, 0.4, SLOPE_LEN]} />
          <meshStandardMaterial color={P.roofTile} roughness={0.78} />
        </mesh>
        {rows}
      </group>
      <group position={[0, 2.2, -8]} rotation={[ROOF_PITCH, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[40, 0.4, SLOPE_LEN]} />
          <meshStandardMaterial color={P.roofTile} roughness={0.78} />
        </mesh>
        {rows}
      </group>
      <mesh castShadow position={[0, 4.5, 0]}>
        <boxGeometry args={[41, 0.55, 1.4]} />
        <meshStandardMaterial color={P.roofTileDark} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.05, 16.5]}>
        <boxGeometry args={[41, 0.5, 0.6]} />
        <meshStandardMaterial color={P.roofTileDark} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.05, -16.5]}>
        <boxGeometry args={[41, 0.5, 0.6]} />
        <meshStandardMaterial color={P.roofTileDark} roughness={0.75} />
      </mesh>
    </group>
  );
}

function Awning({ x, z, w = 6, rot = 0 }: { x: number; z: number; w?: number; rot?: number }) {
  return (
    <group position={[x, 4.2, z]} rotation={[0, rot, 0]}>
      <mesh castShadow rotation={[-0.35, 0, 0]} position={[0, 0, 0.8]}>
        <boxGeometry args={[w, 0.08, 2.2]} />
        <meshStandardMaterial color={P.awningGreen} roughness={0.65} />
      </mesh>
      <mesh rotation={[-0.35, 0, 0]} position={[0, -0.05, 0.8]}>
        <boxGeometry args={[w, 0.08, 2.2]} />
        <meshStandardMaterial color="#1e4a2e" roughness={0.7} />
      </mesh>
    </group>
  );
}

function WallSign({
  x, y, z, text, bg, textColor = "#fff", emissiveColor, w = 4, h = 1.2, rot = 0,
}: {
  x: number; y: number; z: number; text: string;
  bg: string; textColor?: string; emissiveColor?: string;
  w?: number; h?: number; rot?: number;
}) {
  return (
    <group position={[x, y, z]} rotation={[0, rot, 0]}>
      <mesh>
        <boxGeometry args={[w, h, 0.15]} />
        <meshStandardMaterial
          color={bg}
          roughness={0.5}
          emissive={emissiveColor ?? bg}
          emissiveIntensity={emissiveColor ? 0.35 : 0.08}
        />
      </mesh>
      <Text position={[0, 0, 0.1]} fontSize={h * 0.38} color={textColor} anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  );
}

/** Exterior — Japanese shop / street building aesthetic */
export function GymBuilding() {
  return (
    <group>
      {/* Sidewalk platform */}
      <mesh receiveShadow position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[24, 32]} />
        <meshStandardMaterial color={P.sidewalk} roughness={0.78} />
      </mesh>

      {/* Main building body */}
      <mesh castShadow position={[0, 3.2, 0]}>
        <boxGeometry args={[34, 6.4, 26]} />
        <meshStandardMaterial color={P.buildingWall} roughness={0.62} />
      </mesh>

      {/* Wood trim band at base */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[35, 0.8, 27]} />
        <meshStandardMaterial color={P.wood} roughness={0.82} />
      </mesh>

      {/* Upper trim band */}
      <mesh castShadow position={[0, 6.9, 0]}>
        <boxGeometry args={[36, 1.0, 28]} />
        <meshStandardMaterial color={P.buildingTrim} roughness={0.7} />
      </mesh>

      <TileRoof />

      {/* Front facade — layered Japanese shop front */}
      <mesh castShadow position={[0, 2.0, 13.15]}>
        <boxGeometry args={[10, 4.0, 0.3]} />
        <meshStandardMaterial color={P.buildingWallWarm} roughness={0.55} />
      </mesh>

      {/* Door frame — dark wood */}
      <mesh position={[0, 1.4, 13.35]}>
        <boxGeometry args={[5.5, 2.8, 0.12]} />
        <meshStandardMaterial color={P.woodDark} roughness={0.6} />
      </mesh>
      {/* Noren (door curtain) hint */}
      <mesh position={[0, 2.4, 13.42]}>
        <boxGeometry args={[4.8, 0.6, 0.04]} />
        <meshStandardMaterial color={P.awningRed} roughness={0.55} />
      </mesh>

      {/* Awnings */}
      <Awning x={-8} z={13.1} w={7} />
      <Awning x={8} z={13.1} w={7} />

      {/* Signs — emissive like the reference */}
      <WallSign x={0} y={7.4} z={13.3} text="POWER PEAK GYM" bg={P.signYellow} textColor={P.uiInk} emissiveColor={P.signEmissive} w={12} h={1.8} />
      <WallSign x={-12} y={5.2} z={13.18} text="鍛錬" bg={P.signRed} textColor="#fff" emissiveColor="#ff4444" w={3.5} h={2.2} />
      <WallSign x={12} y={5.2} z={13.18} text="山の男" bg="#1e3a4a" textColor="#e8dece" emissiveColor="#3a6a8a" w={3.8} h={1.4} />

      {/* Side sign — perpendicular projecting */}
      <WallSign x={17.2} y={5.0} z={4} text="GYM" bg={P.signGreen} textColor="#fff" emissiveColor="#44aa66" w={2} h={3} rot={Math.PI / 2} />

      {/* Balcony railing — second floor hint */}
      <mesh position={[0, 5.5, 13.3]}>
        <boxGeometry args={[30, 0.08, 0.5]} />
        <meshStandardMaterial color={P.metal} roughness={0.4} metalness={0.3} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={`bl${i}`} position={[-14 + i * 2.5, 5.1, 13.3]}>
          <boxGeometry args={[0.06, 0.8, 0.06]} />
          <meshStandardMaterial color={P.metal} roughness={0.45} metalness={0.3} />
        </mesh>
      ))}

      {/* Side wall wood panels */}
      <mesh castShadow position={[-16.2, 3.2, 0]}>
        <boxGeometry args={[1.4, 6.4, 26]} />
        <meshStandardMaterial color={P.buildingTrimLight} roughness={0.72} />
      </mesh>
      <mesh castShadow position={[16.2, 3.2, 0]}>
        <boxGeometry args={[1.4, 6.4, 26]} />
        <meshStandardMaterial color={P.buildingTrimLight} roughness={0.72} />
      </mesh>

      {/* Entrance step — stone */}
      <mesh castShadow position={[0, 0.25, 13.5]}>
        <boxGeometry args={[18, 0.35, 2]} />
        <meshStandardMaterial color={P.curb} roughness={0.8} />
      </mesh>

      {/* Door prompt */}
      <Text position={[0, 2.9, 13.55]} fontSize={0.3} color={P.lantern} anchorX="center">
        Walk in to enter
      </Text>

      {/* Pet shop — small annexed booth */}
      <mesh position={[11, 1.4, 10]} castShadow>
        <boxGeometry args={[3.2, 2.8, 2.4]} />
        <meshStandardMaterial color={P.buildingWallWarm} roughness={0.6} />
      </mesh>
      <mesh position={[11, 2.9, 10]}>
        <boxGeometry args={[3.6, 0.2, 2.8]} />
        <meshStandardMaterial color={P.roofTile} roughness={0.75} />
      </mesh>
      <Text position={[11, 3.2, 11.3]} fontSize={0.32} color={P.uiInk} anchorX="center">
        PET SHOP
      </Text>

      {/* Planters beside entrance */}
      {[-4.5, 4.5].map((x) => (
        <group key={`pl${x}`} position={[x, 0.4, 14.2]}>
          <mesh castShadow>
            <boxGeometry args={[1.0, 0.8, 0.8]} />
            <meshStandardMaterial color={P.curb} roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.55, 8, 8]} />
            <meshStandardMaterial color={P.leaf} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
