import { create } from "zustand";

interface UserState {
  user: string | null;
  userDetails: Record<string, string | undefined> | null;
  login: (username: string, details?: Record<string, string>) => void;
  logout: () => void;
  register: (username: string, details?: Record<string, string>) => void;
}

const useUserStore = create<UserState>((set) => {
  const isClient = typeof window !== "undefined";

  const savedUser = isClient ? localStorage.getItem("user") : null;
  const savedUserDetails = isClient ? localStorage.getItem("userDetails") : null;

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    userDetails: savedUserDetails ? JSON.parse(savedUserDetails) : null,

    login: (username, details = {}) => {
      if (isClient) {
        localStorage.setItem("user", JSON.stringify(username));
        localStorage.setItem("userDetails", JSON.stringify(details));
      }
      set({ user: username, userDetails: details });
    },

    logout: () => {
      if (isClient) {
        localStorage.clear();
      }
      set({ user: null, userDetails: null });
    },

    register: (username, details = {}) => {
      if (isClient) {
        localStorage.setItem("user", JSON.stringify(username));
        localStorage.setItem("userDetails", JSON.stringify(details));
      }
      set({ user: username, userDetails: details });
    },
  };
});

export default useUserStore;