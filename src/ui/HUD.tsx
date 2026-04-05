import { useEffect, useState } from "react";
import { getPetById } from "../data/pets";
import { useGameStore } from "../game/store";

export function HUD() {
  const strength = useGameStore((s) => s.strength);
  const staminaMax = useGameStore((s) => s.staminaMax);
  const coins = useGameStore((s) => s.coins);
  const equippedPetId = useGameStore((s) => s.equippedPetId);
  const lastHint = useGameStore((s) => s.lastHint);
  const trainingStationId = useGameStore((s) => s.trainingStationId);
  const activeMountainId = useGameStore((s) => s.activeMountainId);
  const scene = useGameStore((s) => s.scene);
  const treadmillCooldownEnd = useGameStore((s) => s.treadmillCooldownEnd);
  const pet = getPetById(equippedPetId);

  const [cooldownLeft, setCooldownLeft] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      const remaining = Math.max(0, (treadmillCooldownEnd - performance.now()) / 1000);
      setCooldownLeft(remaining);
    }, 200);
    return () => clearInterval(id);
  }, [treadmillCooldownEnd]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          background: "var(--ui-bg)",
          border: "1px solid var(--ui-border)",
          borderRadius: 14,
          padding: "12px 16px",
          minWidth: 240,
          boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--ui-text)" }}>
          Break a Mountain <span style={{ color: "#db2777" }}>v2</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 15, color: "#334155" }}>
          <div>
            Strength: <b>{Math.floor(strength)}</b>
          </div>
          <div>
            Stamina: <b>{Math.floor(staminaMax)}</b>
          </div>
          <div>
            Coins: <b>{coins}</b>
          </div>
          <div style={{ marginTop: 6 }}>
            Pet:{" "}
            <b style={{ color: pet ? "#6366f1" : "#94a3b8" }}>
              {pet?.name ?? "None"}
            </b>
          </div>
          {cooldownLeft > 0 && (
            <div style={{ marginTop: 4, color: "#0ea5e9", fontSize: 13 }}>
              Treadmill: {cooldownLeft.toFixed(1)}s
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          alignSelf: "center",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid var(--ui-border)",
          borderRadius: 12,
          padding: "10px 16px",
          maxWidth: 520,
          textAlign: "center",
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {lastHint}
      </div>

      <div
        style={{
          alignSelf: "flex-end",
          background: "var(--ui-bg)",
          border: "1px solid var(--ui-border)",
          borderRadius: 12,
          padding: "10px 14px",
          fontSize: 13,
          color: "#475569",
          maxWidth: 440,
        }}
      >
        <div>
          <b>Move</b> WASD · <b>Sprint</b> Shift · <b>Rotate cam</b> Space+←→ · <b>Shop</b> B ·{" "}
          <b>Stuck</b> R
        </div>
        <div style={{ marginTop: 6 }}>
          {scene === "gym" && trainingStationId && (
            <span style={{ color: "var(--ui-success)" }}>Press E to train</span>
          )}
          {scene === "gym" && !trainingStationId && (
            <span>Walk near equipment and press E · Walk to a door to exit</span>
          )}
          {scene === "overworld" && activeMountainId && (
            <span style={{ color: "var(--ui-accent)" }}>Hold E to smash the mountain</span>
          )}
          {scene === "overworld" && !activeMountainId && (
            <span>Walk into the gym front door · Follow paths to mountains</span>
          )}
        </div>
      </div>
    </div>
  );
}
