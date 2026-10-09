import { createContext, useContext } from "react";
import type { LegalDocumentId } from "../../config/legal";

export interface LegalContextValue {
  openLegal: (id: LegalDocumentId) => void;
  closeLegal: () => void;
}

export const LegalContext = createContext<LegalContextValue | null>(null);

export const useLegal = () => {
  const context = useContext(LegalContext);
  if (!context) {
    throw new Error("useLegal debe usarse dentro de <LegalProvider>");
  }
  return context;
};