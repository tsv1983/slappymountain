import { RoundedBox } from "@react-three/drei";
import { PALETTE } from "../config/palette";
import { SEG } from "../config/quality";

const P = PALETTE;

function UtilityPole({ x, z, yaw = 0 }: { x: number; z: number; yaw?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, yaw, 0]}>
      <mesh castShadow position={[0, 4, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 8, SEG.cyl]} />
        <meshStandardMaterial color={P.metal} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 7.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 3.5, 8]} />
        <meshStandardMaterial color={P.metal} roughness={0.55} metalness={0.2} />
      </mesh>
      <mesh position={[0, 6.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 2.2, 8]} />
        <meshStandardMaterial color={P.metal} roughness={0.55} metalness={0.2} />
      </mesh>
      {[-1.4, -0.7, 0, 0.7, 1.4].map((ox, i) => (
        <mesh key={i} position={[ox, 7.35, 0]}>
          <cylinderGeometry args={[0.04, 0.055, 0.2, SEG.cyl]} />
          <meshPhysicalMaterial color="#d0c8b8" roughness={0.35} clearcoat={0.4} clearcoatRoughness={0.3} />
        </mesh>
      ))}
      <RoundedBox args={[0.5, 0.7, 0.4]} radius={0.04} smoothness={3} position={[0.3, 5.5, 0]} castShadow>
        <meshStandardMaterial color={P.metalLight} roughness={0.5} />
      </RoundedBox>
    </group>
  );
}

function TrafficCone({ x, z, yaw = 0 }: { x: number; z: number; yaw?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, yaw, 0]}>
      <mesh castShadow position={[0, 0.25, 0]}>
        <coneGeometry args={[0.15, 0.5, SEG.cone]} />
        <meshPhysicalMaterial color="#e86030" roughness={0.4} clearcoat={0.3} clearcoatRoughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[0.12, 0.12, SEG.cone]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.45} />
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
        <cylinderGeometry args={[0.28, 0.28, 1.0, SEG.cyl]} />
        <meshPhysicalMaterial color={P.signRed} roughness={0.38} clearcoat={0.5} clearcoatRoughness={0.25} />
      </mesh>
      <mesh castShadow position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.28, SEG.sphere, SEG.sphere / 2, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color={P.signRed} roughness={0.38} clearcoat={0.5} clearcoatRoughness={0.25} />
      </mesh>
      <mesh position={[0, 0.6, 0.29]}>
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
        <cylinderGeometry args={[0.2, 0.26, 0.65, SEG.cyl]} />
        <meshStandardMaterial
          color={P.lantern}
          emissive={P.lanternGlow}
          emissiveIntensity={0.5}
          roughness={0.42}
        />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.18, 8]} />
        <meshStandardMaterial color={P.woodDark} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.06, 0.04, 0.1, 8]} />
        <meshStandardMaterial color={P.woodDark} roughness={0.8} />
      </mesh>
    </group>
  );
}

export function StreetProps() {
  return (
    <group>
      <UtilityPole x={20} z={16} yaw={0.15} />
      <UtilityPole x={-20} z={-14} yaw={-0.3} />
      <UtilityPole x={-18} z={20} yaw={0.8} />

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
            <cylinderGeometry args={[0.015, 0.015, len, 6]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.55} metalness={0.15} />
          </mesh>
        );
      })}

      <TrafficCone x={16} z={14} yaw={0.2} />
      <TrafficCone x={17} z={14.5} yaw={-0.35} />
      <TrafficCone x={-15} z={15} yaw={0.6} />
      <TrafficCone x={8} z={-16} yaw={-0.1} />
      <TrafficCone x={9} z={-15.5} yaw={0.45} />

      <Mailbox x={-6} z={15} rot={0.2} />

      <Lantern x={-5.5} y={5.8} z={13.8} />
      <Lantern x={5.5} y={5.8} z={13.8} />
      <Lantern x={-2.5} y={6.2} z={13.8} />
      <Lantern x={2.5} y={6.2} z={13.8} />
    </group>
  );
}
