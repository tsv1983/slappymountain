import { Text } from "@react-three/drei";
import { GYM_EQUIPMENT } from "../data/gymEquipment";
import { PALETTE } from "../config/palette";
import { TreadmillProp } from "./TreadmillProp";
import { DeadliftProp } from "./DeadliftProp";

const P = PALETTE;

export function GymInterior() {
  const W = 28;
  const D = 24;
  const H = 7;
  const wallT = 0.5;

  return (
    <group>
      {/* Wood floor */}
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={P.woodLight} roughness={0.72} />
      </mesh>
      {/* Floor planks — dark lines */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={`fp${i}`} position={[-W / 2 + (i + 1) * (W / 11), 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.04, D]} />
          <meshStandardMaterial color={P.woodDark} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Walls — warm plaster with wood trim */}
      <mesh castShadow position={[-(W / 2 + wallT / 2), H / 2, 0]}>
        <boxGeometry args={[wallT, H, D]} />
        <meshStandardMaterial color={P.buildingWall} roughness={0.6} />
      </mesh>
      <mesh castShadow position={[W / 2 + wallT / 2, H / 2, 0]}>
        <boxGeometry args={[wallT, H, D]} />
        <meshStandardMaterial color={P.buildingWall} roughness={0.6} />
      </mesh>

      {/* Back wall with door gap */}
      <mesh castShadow position={[-(W / 4 + 1.5), H / 2, -(D / 2 + wallT / 2)]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color={P.buildingWall} roughness={0.6} />
      </mesh>
      <mesh castShadow position={[W / 4 + 1.5, H / 2, -(D / 2 + wallT / 2)]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color={P.buildingWall} roughness={0.6} />
      </mesh>

      {/* Front wall with door gap */}
      <mesh castShadow position={[-(W / 4 + 1.5), H / 2, D / 2 + wallT / 2]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color={P.buildingWallWarm} roughness={0.55} />
      </mesh>
      <mesh castShadow position={[W / 4 + 1.5, H / 2, D / 2 + wallT / 2]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color={P.buildingWallWarm} roughness={0.55} />
      </mesh>

      {/* Wood trim at base of all walls */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[W + 1.2, 0.6, D + 1.2]} />
        <meshStandardMaterial color={P.wood} roughness={0.8} transparent opacity={0.4} />
      </mesh>

      {/* Front door — noren / curtain accent */}
      <mesh position={[0, 2.2, D / 2 + 0.05]}>
        <boxGeometry args={[4, 0.7, 0.08]} />
        <meshStandardMaterial color={P.awningRed} roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.2, D / 2 + 0.05]}>
        <boxGeometry args={[4, 2.4, 0.1]} />
        <meshStandardMaterial color={P.woodDark} transparent opacity={0.4} roughness={0.6} />
      </mesh>
      <Text position={[0, 3.4, D / 2 + 0.1]} fontSize={0.35} color={P.uiInk} anchorX="center">
        FRONT EXIT
      </Text>

      {/* Back door */}
      <mesh position={[0, 1.2, -(D / 2 + 0.05)]}>
        <boxGeometry args={[4, 2.4, 0.1]} />
        <meshStandardMaterial color={P.woodDark} transparent opacity={0.4} roughness={0.6} />
      </mesh>
      <Text position={[0, 3.4, -(D / 2 + 0.1)]} fontSize={0.35} color={P.uiInk} anchorX="center">
        BACK EXIT
      </Text>

      {/* Overhead sign */}
      <Text position={[0, 5.5, 0]} fontSize={0.6} color={P.uiInk} anchorX="center" anchorY="middle">
        POWER PEAK GYM
      </Text>

      {/* Side labels — painted on wall */}
      <Text position={[-10, 3, 0]} fontSize={0.4} color={P.signRed} anchorX="center" rotation={[0, Math.PI / 2, 0]}>
        STRENGTH
      </Text>
      <Text position={[10, 3, 0]} fontSize={0.4} color={P.signGreen} anchorX="center" rotation={[0, -Math.PI / 2, 0]}>
        STAMINA
      </Text>

      {/* Floor spotlights — warm */}
      <mesh position={[-8, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 24]} />
        <meshStandardMaterial color={P.signYellow} transparent opacity={0.12} roughness={1} />
      </mesh>
      <mesh position={[8, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 24]} />
        <meshStandardMaterial color={P.signYellow} transparent opacity={0.12} roughness={1} />
      </mesh>

      {/* Equipment */}
      {GYM_EQUIPMENT.map((s) => (
        <group key={s.id} position={s.position} rotation={[0, s.rotationY, 0]}>
          <Text position={[0, 2.4, 0]} fontSize={0.38} color={P.uiInk} anchorX="center">
            {s.label} — press E
          </Text>
          {s.kind === "treadmill" ? (
            <TreadmillProp stationId={s.id} />
          ) : (
            <DeadliftProp stationId={s.id} />
          )}
        </group>
      ))}

      {/* Warm interior lights */}
      <pointLight position={[-8, 5, 0]} intensity={0.5} color="#f5d8a8" />
      <pointLight position={[8, 5, 0]} intensity={0.5} color="#f5d8a8" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" />
    </group>
  );
}
