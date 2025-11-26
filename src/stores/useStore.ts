import { create } from "zustand";

type Vec3 = [number, number, number];

type Obj = {
  id: string;
  type: string;
  props: {
    position: Vec3;
    rotation: Vec3;
    scale: Vec3;
    color?: string;
    [k: string]: unknown;
  };
  owner?: string;
};

type Player = {
  id: string;
  name: string;
  color: string;
  lastSeen: number;
};

type State = {
  objects: Record<string, Obj>;
  players: Record<string, Player>;
  addOrUpdateObject: (o: Obj) => void;
  removeObject: (id: string) => void;
  setPlayer: (p: Player) => void;
  removePlayer: (id: string) => void;
};

export const useStore = create<State>((set) => ({
  objects: {},
  players: {},
  addOrUpdateObject: (o) =>
    set((state) => ({ objects: { ...state.objects, [o.id]: o } })),
  removeObject: (id) =>
    set((state) => {
      const next = { ...state.objects };
      delete next[id];
      return { objects: next };
    }),
  setPlayer: (p) => set((s) => ({ players: { ...s.players, [p.id]: p } })),
  removePlayer: (id) =>
    set((s) => {
      const next = { ...s.players };
      delete next[id];
      return { players: next };
    }),
}));
