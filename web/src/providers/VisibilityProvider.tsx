import React, { createContext, useContext, useEffect, useState } from "react";
import type { Context } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import type { MockResponseContexto } from "@/page/PainelContext";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
  setVisiblePainel: (visible: boolean) => void;
  visiblePainel: boolean;
  setVisibleGarage: (visible: boolean) => void;
  visibleGarage: boolean;
  setVisibleContext: (context: MockResponseContexto | null) => void;
  visibleContext: MockResponseContexto | null;
}

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visiblePainel, setVisiblePainel] = useState(false);
  const [visibleGarage, setVisibleGarage] = useState(false);
  const [visibleContext, setVisibleContext] =
    useState<MockResponseContexto | null>(null);

  useNuiEvent<boolean>("setVisibleGarage", setVisibleGarage);
  useNuiEvent<boolean>("setVisiblePainel", setVisiblePainel);
  useNuiEvent<MockResponseContexto | null>("setVisibleContext", (data) =>
    setVisibleContext(data)
  );

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      console.log("Key pressed:", e.code);
      if (e.code === "Backspace" || e.code === "Escape") {
        if (!isEnvBrowser()) {
          fetchNui("hideFrame");
        } else {
          if (visibleGarage) {
            setVisibleGarage(false);
            fetchNui("hideFrame");
          } else if (visiblePainel) {
            setVisiblePainel(false);
            fetchNui("hideFrame");
          } else if (visibleContext && visibleContext?.title) {
            setVisibleContext(null);
            fetchNui("hideFrame");
          }
        }
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [visiblePainel, visibleGarage, visibleContext]);

  useEffect(() => {
    if (!visiblePainel && !visibleGarage && !visibleContext) {
      fetchNui("hideFrame");
    }
  }, [visiblePainel, visibleGarage, visibleContext]);

  return (
    <VisibilityCtx.Provider
      value={{
        visiblePainel,
        setVisiblePainel,
        visibleGarage,
        setVisibleGarage,
        visibleContext,
        setVisibleContext,
      }}
    >
      <div
        style={{
          visibility:
            visiblePainel ||
            visibleGarage ||
            (visibleContext && visibleContext?.title !== "")
              ? "visible"
              : "hidden",
          height: "100%",
        }}
      >
        {children}
      </div>
    </VisibilityCtx.Provider>
  );
};

export const useVisibility = () =>
  useContext<VisibilityProviderValue>(
    VisibilityCtx as Context<VisibilityProviderValue>
  );
