import { create } from "zustand";
import { currencies, type Currency } from "@/i18n/currency";
import { setCurrencyCookie } from "@/app/actions/currency.actions";

interface CurrencyState {
  currency: Currency;
  supported: readonly Currency[];
  setCurrency: (currency: Currency) => Promise<void>;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "USD",
  supported: currencies,
  setCurrency: async (next: Currency) => {
    const result = await setCurrencyCookie(next);
    if (result?.success) {
      set({ currency: next });
    }
  },
}));
