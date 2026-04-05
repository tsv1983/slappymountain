import { MOUNTAINS } from "../data/mountains";

export function WorldMarkers() {
  return (
    <group>
      {MOUNTAINS.map((m) => {
        const len = Math.sqrt(m.position[0] ** 2 + m.position[2] ** 2) || 1;
        const nx = (m.position[0] / len) * 11;
        const nz = (m.position[2] / len) * 11;
        return (
          <group key={m.id}>
            <mesh position={[nx, 4.5, nz]}>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#0ea5e9"
                emissiveIntensity={0.3}
                transparent
                opacity={0.55}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
