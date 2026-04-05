import { PALETTE } from "../config/palette";
import { MOUNTAINS } from "../data/mountains";
import { SEG } from "../config/quality";

const P = PALETTE;

export function WorldMarkers() {
  return (
    <group>
      {MOUNTAINS.map((m) => {
        const len = Math.sqrt(m.position[0] ** 2 + m.position[2] ** 2) || 1;
        const nx = (m.position[0] / len) * 13;
        const nz = (m.position[2] / len) * 13;
        return (
          <group key={m.id} position={[nx, 3.5, nz]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.22, 0.28, 0.65, SEG.cyl]} />
              <meshStandardMaterial
                color={P.lantern}
                emissive={P.lanternGlow}
                emissiveIntensity={0.5}
                roughness={0.42}
              />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.22, 8]} />
              <meshStandardMaterial color={P.woodDark} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.62, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.35, 4]} />
              <meshStandardMaterial color={P.metal} roughness={0.55} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
