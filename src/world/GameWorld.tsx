import { useRef } from "react";
import * as THREE from "three";
import { MOUNTAINS } from "../data/mountains";
import { useGameStore } from "../game/store";
import { CompanionPet } from "../entities/CompanionPet";
import { Player } from "../entities/Player";
import { FloatingNumbers } from "./FloatingNumbers";
import { GymBuilding } from "./GymBuilding";
import { GymInterior } from "./GymInterior";
import { MountainPeak } from "./MountainPeak";
import { NatureProps } from "./NatureProps";
import { OverworldCamera } from "./OverworldCamera";
import { Paths } from "./Paths";
import { TerrainAndZones } from "./TerrainAndZones";
import { WorldLighting } from "./WorldLighting";
import { StreetProps } from "./StreetProps";
import { WaterRipples } from "./WaterRipples";
import { WorldMarkers } from "./WorldMarkers";

export function GameWorld() {
  const playerPos = useRef(new THREE.Vector3(0, 0, 18));
  const playerYaw = useRef(0);
  const scene = useGameStore((s) => s.scene);

  return (
    <>
      <WorldLighting />

      {scene === "overworld" && (
        <>
          <TerrainAndZones />
          <Paths />
          <WorldMarkers />
          <NatureProps />
          <GymBuilding />
          <StreetProps />
          <WaterRipples />
          {MOUNTAINS.map((m) => (
            <MountainPeak key={m.id} def={m} />
          ))}
        </>
      )}

      {scene === "gym" && <GymInterior />}

      <Player
        onMove={(p, yaw) => {
          playerPos.current.copy(p);
          playerYaw.current = yaw;
        }}
      />
      <OverworldCamera />
      <CompanionPet playerPos={playerPos} playerYaw={playerYaw} />
      <FloatingNumbers />
    </>
  );
}
