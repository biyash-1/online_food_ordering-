// src/stores/deliveryStore.ts
import { create } from "zustand";

interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface DeliveryStore {
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
}

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  deliveryInfo: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  },
  setDeliveryInfo: (info) => set({ deliveryInfo: info }),
}));
