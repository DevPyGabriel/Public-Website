import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  LEGAL_DOCUMENTS,
  type LegalDocument,
  type LegalDocumentId,
} from "../../config/legal";
import { LegalContext } from "./legal-context";
import { LegalModal } from "./LegalModal";

export const LegalProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<LegalDocument | null>(null);

  const openLegal = useCallback(
    (id: LegalDocumentId) => setActive(LEGAL_DOCUMENTS[id]),
    []
  );

  const closeLegal = useCallback(() => setActive(null), []);

  const value = useMemo(
    () => ({ openLegal, closeLegal }),
    [openLegal, closeLegal]
  );

  return (
    <LegalContext.Provider value={value}>
      {children}
      {active && <LegalModal doc={active} onClose={closeLegal} />}
    </LegalContext.Provider>
  );
};