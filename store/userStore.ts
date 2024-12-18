import { create } from "zustand";

// تعریف نوع اطلاعات کاربر
interface UserState {
  user: string | null;
  userDetails: Record<string, unknown> | null; // ذخیره جزئیات کاربر
  login: (username: string, details?: Record<string, unknown>) => void;
  logout: () => void;
  register: (username: string, details?: Record<string, unknown>) => void;
}

// ایجاد store با پشتیبانی از localStorage
const useUserStore = create<UserState>((set) => {
  // بازیابی اطلاعات از localStorage هنگام بارگذاری اولیه
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
      localStorage.removeItem("user");
      localStorage.removeItem("userDetails");
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
