import { create } from "zustand";

interface UserState {
  user: string | null;
  userDetails: Record<string, string | undefined> | null;
  login: (username: string, details?: Record<string, string>) => void;
  logout: () => void;
  register: (username: string, details?: Record<string, string>) => void;
}

const useUserStore = create<UserState>((set) => {
  const savedUser = localStorage.getItem("user");
  const savedUserDetails = localStorage.getItem("userDetails");

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    userDetails: savedUserDetails ? JSON.parse(savedUserDetails) : null,

    login: (username, details = {}) => {
      localStorage.setItem("user", JSON.stringify(username));
      localStorage.setItem("userDetails", JSON.stringify(details));
      set({ user: username, userDetails: details });
    },

    logout: () => {
      localStorage.clear();
      set({ user: null, userDetails: null });
    },

    register: (username, details = {}) => {
      localStorage.setItem("user", JSON.stringify(username));
      localStorage.setItem("userDetails", JSON.stringify(details));
      set({ user: username, userDetails: details });
    },
  };
});


export default useUserStore;
