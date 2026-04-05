import { PETS } from "../data/pets";
import { useGameStore } from "../game/store";
import { sfx } from "../utils/audio";

const rarityColor: Record<string, string> = {
  common: "#64748b",
  uncommon: "#22c55e",
  rare: "#6366f1",
  mythic: "#db2777",
};

export function ShopPanel() {
  const shopOpen = useGameStore((s) => s.shopOpen);
  const setShopOpen = useGameStore((s) => s.setShopOpen);
  const coins = useGameStore((s) => s.coins);
  const ownedPetIds = useGameStore((s) => s.ownedPetIds);
  const equippedPetId = useGameStore((s) => s.equippedPetId);
  const buyPet = useGameStore((s) => s.buyPet);
  const equipPet = useGameStore((s) => s.equipPet);

  if (!shopOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
      onClick={() => setShopOpen(false)}
    >
      <div
        style={{
          width: "min(920px, 92vw)",
          maxHeight: "80vh",
          overflow: "auto",
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>Pet Shop</div>
            <div style={{ color: "#64748b", marginTop: 4 }}>
              Coins: <b>{coins}</b> — equip one companion for passive bonuses.
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShopOpen(false);
              sfx.ui();
            }}
            style={{
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              borderRadius: 10,
              padding: "8px 14px",
              fontWeight: 800,
            }}
          >
            Close
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 12,
            marginTop: 16,
          }}
        >
          {PETS.map((p) => {
            const owned = ownedPetIds.includes(p.id);
            const equipped = equippedPetId === p.id;
            const canBuy = !owned && coins >= p.price;
            return (
              <div
                key={p.id}
                style={{
                  border: equipped ? "2px solid #6366f1" : "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 12,
                  background: equipped ? "#eef2ff" : "#fafafa",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>{p.name}</div>
                  <div style={{ color: rarityColor[p.rarity], fontWeight: 800, fontSize: 12 }}>
                    {p.rarity.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>{p.description}</div>
                <div style={{ marginTop: 8, fontSize: 13, color: "#334155" }}>
                  <b>{p.price}</b> coins
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  {!owned && (
                    <button
                      type="button"
                      disabled={!canBuy}
                      onClick={() => {
                        if (buyPet(p.id)) sfx.coin();
                      }}
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "none",
                        fontWeight: 800,
                        background: canBuy ? "#22c55e" : "#cbd5e1",
                        color: "#fff",
                      }}
                    >
                      Buy
                    </button>
                  )}
                  {owned && (
                    <button
                      type="button"
                      onClick={() => {
                        equipPet(equipped ? null : p.id);
                        sfx.ui();
                      }}
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid #cbd5e1",
                        fontWeight: 800,
                        background: equipped ? "#6366f1" : "#fff",
                        color: equipped ? "#fff" : "#0f172a",
                      }}
                    >
                      {equipped ? "Unequip" : "Equip"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
