import { create } from "zustand";

interface UserState {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  register: (username: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (username) => set({ user: username }),
  logout: () => set({ user: null }),
  register: (username) => set({ user: username }),
}));

export default useUserStore;
