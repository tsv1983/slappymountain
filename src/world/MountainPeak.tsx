import { Html, Text } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { MountainDef } from "../data/mountains";
import { useGameStore } from "../game/store";
import { combinePetModifiers } from "../game/petModifiers";
import { effectiveStaminaRequirement } from "../systems/mountainCombat";

function MountainGeometry({
  def,
  hp,
}: {
  def: MountainDef;
  hp: number;
}) {
  const s = def.scale;
  if (def.shape === "mesa") {
    return (
      <group>
        <mesh castShadow position={[0, s * 1.4 * hp, 0]}>
          <cylinderGeometry args={[s * 2.1, s * 2.4, s * 2.8 * Math.max(0.1, hp), 10]} />
          <meshStandardMaterial
            color={def.color}
            emissive={def.rimColor}
            emissiveIntensity={0.12}
            roughness={0.82}
          />
        </mesh>
        <mesh castShadow position={[0, s * 0.35, 0]}>
          <cylinderGeometry args={[s * 2.5, s * 2.7, s * 0.7, 10]} />
          <meshStandardMaterial color={def.rockColor} roughness={1} />
        </mesh>
      </group>
    );
  }
  if (def.shape === "spire") {
    return (
      <group>
        <mesh castShadow position={[0, s * 3.2 * hp, 0]}>
          <coneGeometry args={[s * 0.9, s * 6.4 * Math.max(0.1, hp), 6]} />
          <meshStandardMaterial color={def.color} roughness={0.75} emissive={def.rimColor} emissiveIntensity={0.18} />
        </mesh>
        <mesh castShadow position={[0, s * 0.4, 0]}>
          <cylinderGeometry args={[s * 1.8, s * 2.2, s * 0.8, 8]} />
          <meshStandardMaterial color={def.rockColor} roughness={1} />
        </mesh>
      </group>
    );
  }
  if (def.shape === "twin") {
    return (
      <group>
        <mesh castShadow position={[-s * 0.9, s * 2.1 * hp, 0]}>
          <coneGeometry args={[s * 1.6, s * 4.2 * Math.max(0.1, hp), 7]} />
          <meshStandardMaterial color={def.color} roughness={0.8} />
        </mesh>
        <mesh castShadow position={[s * 0.9, s * 2.4 * hp, 0.4]}>
          <coneGeometry args={[s * 1.45, s * 4.8 * Math.max(0.1, hp), 7]} />
          <meshStandardMaterial color={def.rimColor} roughness={0.78} />
        </mesh>
        <mesh castShadow position={[0, s * 0.35, 0]}>
          <cylinderGeometry args={[s * 2.8, s * 3.2, s * 0.7, 10]} />
          <meshStandardMaterial color={def.rockColor} roughness={1} />
        </mesh>
      </group>
    );
  }
  return (
    <group>
      <mesh castShadow position={[0, s * 2.2 * hp, 0]}>
        <coneGeometry args={[s * 2.2, s * 4.4 * Math.max(0.1, hp), 8]} />
        <meshStandardMaterial color={def.color} roughness={0.85} emissive={def.rimColor} emissiveIntensity={0.14} />
      </mesh>
      <mesh castShadow position={[0, s * 0.35, 0]}>
        <cylinderGeometry args={[s * 2.4, s * 2.8, s * 0.7, 10]} />
        <meshStandardMaterial color={def.rockColor} roughness={1} />
      </mesh>
    </group>
  );
}

export function MountainPeak({ def }: { def: MountainDef }) {
  const progress = useGameStore((s) => s.mountains[def.id]);
  const equippedPetId = useGameStore((s) => s.equippedPetId);
  const staminaMax = useGameStore((s) => s.staminaMax);

  const mods = useMemo(() => combinePetModifiers(equippedPetId), [equippedPetId]);
  const need = effectiveStaminaRequirement(def, mods);
  const reachable = staminaMax >= need - 0.01;

  const broken = progress?.broken;
  const ratio = broken ? 1 : (progress?.damageDealt ?? 0) / def.maxHealth;
  const hp = Math.max(0.2, 1 - ratio);

  const tint = useMemo(() => {
    const c = new THREE.Color(def.rockColor);
    c.lerp(new THREE.Color("#fecaca"), ratio * 0.9);
    return c;
  }, [def.rockColor, ratio]);

  if (broken) {
    return (
      <group position={def.position}>
        <Html position={[0, 2, 0]} center distanceFactor={10}>
          <div
            style={{
              background: "rgba(255,255,255,0.92)",
              padding: "6px 10px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 800,
              color: "#15803d",
              border: "1px solid #86efac",
            }}
          >
            {def.name} — smashed!
          </div>
        </Html>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <mesh
            key={i}
            castShadow
            position={[
              (Math.sin(i * 1.7) - 0.5) * def.scale * 2.2,
              0.2 + ((i * 17) % 7) * 0.06,
              (Math.cos(i * 1.1) - 0.5) * def.scale * 2.2,
            ]}
          >
            <dodecahedronGeometry args={[0.22 + ((i * 13) % 5) * 0.03, 0]} />
            <meshStandardMaterial color={def.rockColor} roughness={0.9} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group position={def.position}>
      <MountainGeometry def={def} hp={hp} />
      {ratio > 0.04 && (
        <mesh
          position={[def.scale * 0.9, def.scale * 1.6, def.scale * 0.5]}
          rotation={[0.5, 0.2, 0.4]}
        >
          <planeGeometry args={[def.scale * 2.2, def.scale * 2.8]} />
          <meshStandardMaterial
            transparent
            opacity={0.28 + ratio * 0.45}
            color="#0f172a"
            roughness={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {/* Base ground ring */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[def.scale * 2.8, def.scale * 3.05, 24]} />
        <meshStandardMaterial color={tint} transparent opacity={0.35} roughness={1} />
      </mesh>
      <Text
        position={[0, def.scale * 5.2, 0]}
        fontSize={0.48}
        color="#0f172a"
        anchorX="center"
      >
        {def.name}
      </Text>
      <Html position={[0, def.scale * 6, 0]} center distanceFactor={12}>
        <div
          style={{
            background: reachable
              ? "rgba(255,255,255,0.94)"
              : "rgba(254, 226, 226, 0.96)",
            border: reachable ? "2px solid #a5b4fc" : "2px solid #f87171",
            padding: "8px 12px",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 800,
            color: "#0f172a",
            minWidth: 168,
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(15,23,42,0.12)",
          }}
        >
          <div>STAMINA {def.staminaRequired}+</div>
          <div>STR {def.strengthRequired}+</div>
          {!reachable && (
            <div style={{ color: "#b91c1c", marginTop: 4 }}>
              Train stamina to travel here
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
