import React, { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import type { MockResponseContexto } from "@/page/PainelContext";
import type { TabType } from "@/types";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
  setVisiblePainel: (visible: boolean) => void;
  visiblePainel: boolean;
  setVisibleGarage: (visible: boolean) => void;
  visibleGarage: boolean;
  setVisibleContext: (context: MockResponseContexto | null) => void;
  visibleContext: MockResponseContexto | null;
  lastActiveTab: TabType;
  setLastActiveTab: (tab: TabType) => void;
}

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visiblePainel, setVisiblePainel] = useState(false);
  const [visibleGarage, setVisibleGarage] = useState(false);
  const [visibleContext, setVisibleContext] =
    useState<MockResponseContexto | null>(null);
  const [lastActiveTab, setLastActiveTab] = useState<TabType>("dashboard");
  const [wasAnyPanelVisible, setWasAnyPanelVisible] = useState(false);

  useNuiEvent<boolean>("setVisibleGarage", setVisibleGarage);
  useNuiEvent<boolean>("setVisiblePainel", setVisiblePainel);
  useNuiEvent<MockResponseContexto | null>("setVisibleContext", (data) =>
    setVisibleContext(data)
  );

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === "Backspace" || e.code === "Escape") {
        if (visibleContext && visibleContext?.title) {
          setVisibleContext(null);
          if (!isEnvBrowser()) {
            fetchNui("hideFrame");
          }
        } else if (visibleGarage) {
          setVisibleGarage(false);
          if (!isEnvBrowser()) {
            fetchNui("hideFrame");
          }
        } else if (visiblePainel) {
          setVisiblePainel(false);
          if (!isEnvBrowser()) {
            fetchNui("hideFrame");
          }
        }
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [visiblePainel, visibleGarage, visibleContext]);

  // Controla quando algum painel está visível
  useEffect(() => {
    const anyPanelVisible =
      visiblePainel ||
      visibleGarage ||
      (visibleContext && visibleContext?.title !== "");

    if (anyPanelVisible) {
      setWasAnyPanelVisible(true);
    } else if (wasAnyPanelVisible && !anyPanelVisible) {
      if (!isEnvBrowser()) {
        fetchNui("hideFrame");
      }
      setWasAnyPanelVisible(false);
    }
  }, [visiblePainel, visibleGarage, visibleContext, wasAnyPanelVisible]);

  return (
    <VisibilityCtx.Provider
      value={{
        visiblePainel,
        setVisiblePainel,
        visibleGarage,
        setVisibleGarage,
        visibleContext,
        setVisibleContext,
        lastActiveTab,
        setLastActiveTab,
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

export const useVisibility = (): VisibilityProviderValue => {
  const context = useContext(VisibilityCtx);

  if (!context) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }

  return context;
};
