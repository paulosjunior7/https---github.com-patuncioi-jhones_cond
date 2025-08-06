import React, { createContext, useContext, useEffect, useState } from "react";
import type { Context } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
  setVisiblePainel: (visible: boolean) => void;
  visiblePainel: boolean;
  setVisibleGarage: (visible: boolean) => void;
  visibleGarage: boolean;
  setVisibleContext: (context: boolean) => void;
  visibleContext: boolean;
}

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visiblePainel, setVisiblePainel] = useState(false);
  const [visibleGarage, setVisibleGarage] = useState(false);
  const [visibleContext, setVisibleContext] = useState(false);

  useNuiEvent<boolean>("setVisibleGarage", setVisibleGarage);
  useNuiEvent<boolean>("setVisiblePainel", setVisiblePainel);
  useNuiEvent<boolean>("setVisibleContext", setVisibleContext);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) {
          fetchNui("hideFrame");
        } else {
          if (visibleGarage) {
            setVisibleGarage(false);
          } else if (visiblePainel) {
            setVisiblePainel(false);
          } else if (visibleContext) {
            setVisibleContext(false);
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
            visiblePainel || visibleGarage || visibleContext
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
