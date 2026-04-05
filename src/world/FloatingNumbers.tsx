import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../game/store";

export function FloatingNumbers() {
  const floats = useGameStore((s) => s.floatingNumbers);
  const cullFloats = useGameStore((s) => s.cullFloats);

  useFrame(() => {
    cullFloats(performance.now());
  });

  return (
    <>
      {floats.map((f) => (
        <Html key={f.id} position={f.position} center>
          <div
            style={{
              color: f.color,
              fontWeight: 900,
              fontSize: 22,
              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
              pointerEvents: "none",
            }}
          >
            {f.text}
          </div>
        </Html>
      ))}
    </>
  );
}
