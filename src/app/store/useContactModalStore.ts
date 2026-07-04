import {create} from "zustand";

interface ContactModalStore {
  isOpen: boolean;
  /** Service key preselected when opening from a Services card (empty = none). */
  selectedService: string;
  open: (service?: string) => void;
  close: () => void;
  toggle: () => void;
}

export const useContactModalStore = create<ContactModalStore>((set) => ({
    isOpen: false,
    selectedService: "",
    open: (service = "") => set({isOpen: true, selectedService: service}),
    close: () => set({isOpen: false}),
    toggle: () => set((state) => ({isOpen: !state.isOpen})),
}));