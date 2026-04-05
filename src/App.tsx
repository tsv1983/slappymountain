import { GameCanvas } from "./components/game/GameCanvas";
import { HUD } from "./ui/HUD";
import { Minimap } from "./ui/Minimap";
import { ShopPanel } from "./ui/ShopPanel";
import { TutorialBanner } from "./ui/TutorialBanner";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <GameCanvas />
      <HUD />
      <Minimap />
      <TutorialBanner />
      <ShopPanel />
    </div>
  );
}
