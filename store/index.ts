import { TTicket } from "@/types/tickets";
import { create } from "zustand";

type Store = {
  teste: string;
  listTickets: TTicket[];
  setListTickets: (listTickets: TTicket[]) => void;
};

export const useTicketStore = create<Store>((set) => ({
  teste: "Dudu",
  listTickets: [],
  setListTickets: (listTickets) => set({ listTickets }),
}));
