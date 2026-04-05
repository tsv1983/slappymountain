import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { OVERWORLD_CAMERA, GYM_CAMERA, CAMERA_ORBIT_SPEED } from "../config/camera";
import { useGameStore } from "../game/store";
import { useKeyboard } from "../hooks/useKeyboard";

export function OverworldCamera() {
  const { camera } = useThree();
  const keys = useKeyboard();
  const setShake = useGameStore((s) => s.setShake);
  const yawRef = useRef(useGameStore.getState().cameraYaw);

  useFrame((_, dt) => {
    const { livePlayer, shake, scene } = useGameStore.getState();
    const [px, pz] = livePlayer;

    if (keys.current.space) {
      if (keys.current.left) yawRef.current -= CAMERA_ORBIT_SPEED * dt;
      if (keys.current.right) yawRef.current += CAMERA_ORBIT_SPEED * dt;
      useGameStore.getState().setCameraYaw(yawRef.current);
    }

    const cfg = scene === "gym" ? GYM_CAMERA : OVERWORLD_CAMERA;
    const yaw = yawRef.current;

    const offset = new THREE.Vector3(cfg.slightX, cfg.height, cfg.distanceZ);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

    const target = new THREE.Vector3(px + offset.x, offset.y, pz + offset.z);
    const k = 1 - Math.exp(-cfg.lerp * dt);
    camera.position.lerp(target, k);
    camera.up.set(0, 1, 0);
    camera.lookAt(px, cfg.lookAtY, pz);

    if (shake > 0.01) {
      camera.position.x += (Math.random() - 0.5) * shake * 0.55;
      camera.position.z += (Math.random() - 0.5) * shake * 0.35;
      camera.position.y += (Math.random() - 0.5) * shake * 0.28;
      setShake(shake * Math.pow(0.12, dt * 60));
    }
  });

  return null;
}
