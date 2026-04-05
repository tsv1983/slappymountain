import { PALETTE } from "../config/palette";

const P = PALETTE;

function UtilityPole({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      {/* Main pole */}
      <mesh castShadow position={[0, 4, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 8, 8]} />
        <meshStandardMaterial color={P.metal} roughness={0.65} metalness={0.15} />
      </mesh>
      {/* Cross arm */}
      <mesh position={[0, 7.2, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.12, 0.12]} />
        <meshStandardMaterial color={P.metal} roughness={0.6} metalness={0.15} />
      </mesh>
      {/* Secondary arm */}
      <mesh position={[0, 6.4, 0]}>
        <boxGeometry args={[2.2, 0.1, 0.1]} />
        <meshStandardMaterial color={P.metal} roughness={0.6} metalness={0.15} />
      </mesh>
      {/* Insulators */}
      {[-1.4, -0.7, 0, 0.7, 1.4].map((ox, i) => (
        <mesh key={i} position={[ox, 7.35, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.2, 6]} />
          <meshStandardMaterial color="#c8c0b0" roughness={0.5} />
        </mesh>
      ))}
      {/* Transformer box */}
      <mesh position={[0.3, 5.5, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.4]} />
        <meshStandardMaterial color={P.metalLight} roughness={0.55} />
      </mesh>
    </group>
  );
}

function TrafficCone({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh castShadow position={[0, 0.25, 0]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshStandardMaterial color="#e86030" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[0.12, 0.12, 8]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.35, 0.35]} />
        <meshStandardMaterial color={P.asphalt} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Mailbox({ x, z, rot = 0 }: { x: number; z: number; rot?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 1.0, 12]} />
        <meshStandardMaterial color={P.signRed} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.28, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={P.signRed} roughness={0.5} />
      </mesh>
      {/* Mail slot */}
      <mesh position={[0, 0.6, 0.28]}>
        <boxGeometry args={[0.2, 0.04, 0.02]} />
        <meshStandardMaterial color={P.woodDark} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Lantern({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <group position={[x, y, z]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 8]} />
        <meshStandardMaterial
          color={P.lantern}
          emissive={P.lanternGlow}
          emissiveIntensity={0.4}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 6]} />
        <meshStandardMaterial color={P.woodDark} roughness={0.8} />
      </mesh>
    </group>
  );
}

export function StreetProps() {
  return (
    <group>
      {/* Utility poles */}
      <UtilityPole x={20} z={16} />
      <UtilityPole x={-20} z={-14} />
      <UtilityPole x={-18} z={20} />

      {/* Wire between poles (simplified as thin cylinder) */}
      {[
        { from: [20, 7.2, 16], to: [-18, 7.2, 20] },
        { from: [-18, 7.2, 20], to: [-20, 7.2, -14] },
      ].map((w, i) => {
        const fx = w.from[0] as number, fz = w.from[2] as number;
        const tx = w.to[0] as number, tz = w.to[2] as number;
        const mx = (fx + tx) / 2, mz = (fz + tz) / 2;
        const dx = tx - fx, dz = tz - fz;
        const len = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);
        return (
          <mesh key={`wire${i}`} position={[mx, 6.8, mz]} rotation={[0, angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, len, 4]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
          </mesh>
        );
      })}

      {/* Traffic cones — construction/urban feel */}
      <TrafficCone x={16} z={14} />
      <TrafficCone x={17} z={14.5} />
      <TrafficCone x={-15} z={15} />
      <TrafficCone x={8} z={-16} />
      <TrafficCone x={9} z={-15.5} />

      {/* Mailbox */}
      <Mailbox x={-6} z={15} rot={0.2} />

      {/* Hanging lanterns near gym entrance */}
      <Lantern x={-5.5} y={5.8} z={13.8} />
      <Lantern x={5.5} y={5.8} z={13.8} />
      <Lantern x={-2.5} y={6.2} z={13.8} />
      <Lantern x={2.5} y={6.2} z={13.8} />
    </group>
  );
}
