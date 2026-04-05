import { Text } from "@react-three/drei";
import { GYM_EQUIPMENT } from "../data/gymEquipment";
import { PALETTE } from "../config/palette";
import { TreadmillProp } from "./TreadmillProp";
import { DeadliftProp } from "./DeadliftProp";

export function GymInterior() {
  const W = 28;
  const D = 24;
  const H = 7;
  const wallT = 0.5;

  return (
    <group>
      {/* Floor */}
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.75} />
      </mesh>

      {/* Left wall (strength side) */}
      <mesh castShadow position={[-(W / 2 + wallT / 2), H / 2, 0]}>
        <boxGeometry args={[wallT, H, D]} />
        <meshStandardMaterial color={PALETTE.gymWall} roughness={0.55} />
      </mesh>
      {/* Right wall (treadmill side) */}
      <mesh castShadow position={[W / 2 + wallT / 2, H / 2, 0]}>
        <boxGeometry args={[wallT, H, D]} />
        <meshStandardMaterial color={PALETTE.gymWall} roughness={0.55} />
      </mesh>
      {/* Back wall with gap for back door */}
      <mesh castShadow position={[-(W / 4 + 1.5), H / 2, -(D / 2 + wallT / 2)]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color={PALETTE.gymWall} roughness={0.55} />
      </mesh>
      <mesh castShadow position={[W / 4 + 1.5, H / 2, -(D / 2 + wallT / 2)]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color={PALETTE.gymWall} roughness={0.55} />
      </mesh>
      {/* Front wall with gap for front door */}
      <mesh castShadow position={[-(W / 4 + 1.5), H / 2, D / 2 + wallT / 2]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color="#fda4af" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[W / 4 + 1.5, H / 2, D / 2 + wallT / 2]}>
        <boxGeometry args={[W / 2 - 1, H, wallT]} />
        <meshStandardMaterial color="#fda4af" roughness={0.5} />
      </mesh>

      {/* Front door frame highlight */}
      <mesh position={[0, 1.5, D / 2 + 0.05]}>
        <boxGeometry args={[4, 3, 0.15]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      <Text position={[0, 3.4, D / 2 + 0.1]} fontSize={0.35} color="#0f172a" anchorX="center">
        FRONT EXIT
      </Text>

      {/* Back door frame highlight */}
      <mesh position={[0, 1.5, -(D / 2 + 0.05)]}>
        <boxGeometry args={[4, 3, 0.15]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.25}
          transparent
          opacity={0.6}
        />
      </mesh>
      <Text position={[0, 3.4, -(D / 2 + 0.1)]} fontSize={0.35} color="#0f172a" anchorX="center">
        BACK EXIT
      </Text>

      {/* Overhead sign */}
      <Text
        position={[0, 5.5, 0]}
        fontSize={0.65}
        color={PALETTE.uiInk}
        anchorX="center"
        anchorY="middle"
      >
        POWER PEAK GYM
      </Text>

      {/* Side labels */}
      <Text position={[-10, 3, 0]} fontSize={0.4} color="#dc2626" anchorX="center" rotation={[0, Math.PI / 2, 0]}>
        STRENGTH
      </Text>
      <Text position={[10, 3, 0]} fontSize={0.4} color="#0ea5e9" anchorX="center" rotation={[0, -Math.PI / 2, 0]}>
        STAMINA
      </Text>

      {/* Indoor lighting markers (floor spotlights) */}
      <mesh position={[-8, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 24]} />
        <meshStandardMaterial color="#fecaca" transparent opacity={0.25} roughness={1} />
      </mesh>
      <mesh position={[8, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 24]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.25} roughness={1} />
      </mesh>

      {/* Equipment */}
      {GYM_EQUIPMENT.map((s) => (
        <group key={s.id} position={s.position} rotation={[0, s.rotationY, 0]}>
          <Text position={[0, 2.4, 0]} fontSize={0.38} color="#0f172a" anchorX="center">
            {s.label} — press E
          </Text>
          {s.kind === "treadmill" ? (
            <TreadmillProp stationId={s.id} />
          ) : (
            <DeadliftProp stationId={s.id} />
          )}
        </group>
      ))}

      {/* Indoor point lights */}
      <pointLight position={[-8, 5, 0]} intensity={0.5} color="#fde68a" />
      <pointLight position={[8, 5, 0]} intensity={0.5} color="#bae6fd" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" />
    </group>
  );
}
