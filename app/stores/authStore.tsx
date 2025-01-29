import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Update import

interface AuthState {
  username: string | null;
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;
  login: (payload: { username: string; email: string; role: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      email: null,
      role: null,
      isLoggedIn: false,

      login: ({ username, email, role }) => {
        set({ username, email, role, isLoggedIn: true });
      },

      logout: async() => {

        
       try{
       
        const response = await fetch("http://localhost:3001/api/user/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          set({ username: null, email: null, role: null, isLoggedIn: false });
        } else {
          console.error("Failed to logout:", data);
        }
       }catch(error){
         console.error("Error logging out:", error);
       }
      },
    }),
    {
      name: "auth-storage",
      // Use storage instead of getStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;