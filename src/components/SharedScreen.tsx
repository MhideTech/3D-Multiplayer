"use client";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useStore } from "../stores/useStore";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthProvider";

function ObjectMesh({ obj }: { obj: unknown }) {
  const { props, type } = obj;
  return (
    <mesh
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
    >
      {type === "cube" ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <sphereGeometry args={[0.5, 32, 32]} />
      )}
      <meshStandardMaterial color={props.color ?? "#777"} />
    </mesh>
  );
}

export default function SharedScene({ sceneId }: { sceneId: string }) {
  const objects = useStore((s) => Object.values(s.objects));
  const addOrUpdateObject = useStore((s) => s.addOrUpdateObject);
  const removeObject = useStore((s) => s.removeObject);
  const { user } = useAuth();

  useEffect(() => {
    if (!sceneId) return;
    // subscribe to INSERT/UPDATE/DELETE using postgres_changes (supabase-js v2)
    const channel = supabase
      .channel(`public:objects:scene=${sceneId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "objects",
          filter: `scene_id=eq.${sceneId}`,
        },
        (payload) => {
          const newRow = payload.new;
          addOrUpdateObject({
            id: newRow.id,
            type: newRow.type,
            props: newRow.props,
            owner: newRow.owner,
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "objects",
          filter: `scene_id=eq.${sceneId}`,
        },
        (payload) => {
          const newRow = payload.new;
          addOrUpdateObject({
            id: newRow.id,
            type: newRow.type,
            props: newRow.props,
            owner: newRow.owner,
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "objects",
          filter: `scene_id=eq.${sceneId}`,
        },
        (payload) => {
          const old = payload.old;
          removeObject(old.id);
        }
      )
      .subscribe();

    // fetch existing objects once on mount
    supabase
      .from("objects")
      .select()
      .eq("scene_id", sceneId)
      .then(({ data }) => {
        data?.forEach((r: any) => {
          addOrUpdateObject({
            id: r.id,
            type: r.type,
            props: r.props,
            owner: r.owner,
          });
        });
      });

    return () => {
      channel.unsubscribe();
    };
  }, [sceneId]);

  // add object on click handler (example uses center)
  async function addCube() {
    if (!sceneId || !user) return;
    const newObj = {
      scene_id: sceneId,
      type: "cube",
      props: {
        position: [Math.random() * 2, 1.0, Math.random() * 2],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
      owner: user.id,
    };
    await supabase.from("objects").insert(newObj);
  }

  return (
    <div className="w-full h-[70vh]">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <OrbitControls />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#101010" />
        </mesh>

        {objects.map((obj) => (
          <ObjectMesh key={obj.id} obj={obj} />
        ))}
      </Canvas>

      <div className="p-2">
        <button
          onClick={addCube}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Add random cube
        </button>
      </div>
    </div>
  );
}
