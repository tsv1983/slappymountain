import { MOUNTAINS } from "../data/mountains";
import { useGameStore } from "../game/store";

export function Minimap() {
  const [px, pz] = useGameStore((s) => s.livePlayer);
  const scale = 1.8;
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 160,
        height: 160,
        borderRadius: 12,
        border: "1px solid var(--ui-border)",
        background: "rgba(255,255,255,0.85)",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {MOUNTAINS.map((m) => (
          <div
            key={m.id}
            style={{
              position: "absolute",
              left: 80 + m.position[0] * scale,
              top: 80 + m.position[2] * scale,
              width: 8,
              height: 8,
              marginLeft: -4,
              marginTop: -4,
              borderRadius: 999,
              background: "#22c55e",
              opacity: 0.7,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 80 + px * scale,
            top: 80 + pz * scale,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            borderRadius: 999,
            background: "#38bdf8",
            border: "2px solid #0f172a",
          }}
        />
      </div>
    </div>
  );
}
