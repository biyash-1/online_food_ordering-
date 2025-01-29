import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the CartItem type
interface CartItem {
  id: number;
  title: string;
  reviewCount: number;
  quantity: number;
  image: string;
}

// Define the state and actions for the cart
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

// Helper function to get the storage key based on the user ID


// Create the Zustand store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          const updatedItems = existingItem
            ? state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + product.quantity } // Add specified quantity
                  : item
              )
            : [...state.items, { ...product, quantity: product.quantity }]; // Initialize with specified quantity

          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
            totalPrice: updatedItems.reduce(
              (total, item) => total + item.reviewCount * item.quantity,
              0
            ),
          };
        });
      },

      removeFromCart: (id: number) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
            totalPrice: updatedItems.reduce(
              (total, item) => total + item.reviewCount * item.quantity,
              0
            ),
          };
        });
      },

      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
        } else {
          set((state) => {
            const updatedItems = state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );

            return {
              items: updatedItems,
              totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
              totalPrice: updatedItems.reduce(
                (total, item) => total + item.reviewCount * item.quantity,
                0
              ),
            };
          });
        }
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: "cart", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
