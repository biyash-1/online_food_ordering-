import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {toast}  from "react-hot-toast"


interface AuthState {
  username: string | null;
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;
  login: (payload: { username: string; email: string; role: string }) => void;
  logout: () => void;
  refreshAccessToken: () =>void
}
const BASE_URL = process.env.MODE === "development" ? "http://localhost:3001" : (process.env.NEXT_PUBLIC_API_URL as string) 
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      email: null,
      role: null,
      isLoggedIn: false,

      login: ({ username, email, role }) => {
        set({ username, email, role, isLoggedIn: true });
       toast.success("login sucessfull")
      },

       refreshAccessToken : async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/user/refresh-token`, {
            method: "POST",
            credentials: "include",
          });
          const data = await response.json();
          if (response.ok) {
            // Optionally update any auth-related state if needed.
            console.log("Token refreshed successfully");
          } else {
            console.error("Failed to refresh token:", data.msg);
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      },
      logout: async() => {

        
       try{
       
        const response = await fetch(`${BASE_URL}/api/user/logout`, {
          method: "POST",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("logout sucessfull")
          set({ username: null, email: null, role: null, isLoggedIn: false });
           localStorage.removeItem("auth-storage");
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