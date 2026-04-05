import { useEffect, useState } from "react";
import { useGameStore } from "../game/store";

export function TutorialBanner() {
  const tutorialSeen = useGameStore((s) => s.tutorialSeen);
  const [visible, setVisible] = useState(!tutorialSeen);

  useEffect(() => {
    if (tutorialSeen) setVisible(false);
  }, [tutorialSeen]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: "14px 18px",
        maxWidth: 560,
        boxShadow: "0 12px 40px rgba(15,23,42,0.12)",
        pointerEvents: "auto",
      }}
    >
      <div style={{ fontWeight: 900, color: "#0f172a", marginBottom: 8 }}>Adventure start!</div>
      <ol style={{ margin: 0, paddingLeft: 18, color: "#334155", lineHeight: 1.5 }}>
        <li>Find the huge gym at the map center (magenta roof).</li>
        <li>Hold E on the treadmill for stamina, deadlift platform for strength.</li>
        <li>Follow yellow paths to mountains — farther peaks need more stamina.</li>
        <li>Hold E to break — huge peaks need more strength (or chip away over time).</li>
        <li>Earn coins, press B for the pet shop, equip a companion for bonuses.</li>
      </ol>
      <button
        type="button"
        onClick={() => {
          useGameStore.setState({ tutorialSeen: true });
          useGameStore.getState().persist();
          setVisible(false);
        }}
        style={{
          marginTop: 12,
          border: "none",
          borderRadius: 10,
          padding: "8px 14px",
          fontWeight: 800,
          background: "#6366f1",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Let&apos;s go
      </button>
    </div>
  );
}
