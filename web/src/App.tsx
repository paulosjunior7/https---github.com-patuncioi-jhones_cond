import React, { useEffect, useState } from "react";
import { debugData } from "./utils/debugData";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { useVisibility } from "./providers/VisibilityProvider";
import type { TabType } from "./types";
import { cn } from "./lib/utils";
import { X } from "lucide-react";
import {
  IconHome,
  IconUser,
  IconClothes,
  IconUpgrades,
  IconGarage,
  IconTaxas,
} from "./components/icons";

import Taxas from "./page/taxas";
import Dashboard from "./page/dashboard";
import PermissoesUsuarios from "./page/permissoes-usuarios";
import ArmarioVirtual from "./page/armario-virtual";
import Upgrades from "./page/updrades";
import Garage from "./page/garage";
import Loader from "./components/Loader";
import useLoader from "./hooks/useLoader";

// This will set the NUI to visible if we are
// developing in browser

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const menus = [
  {
    key: "dashboard",
    icon: IconHome,
    alt: "Home",
    size: 20,
    tab: "dashboard",
  },
  {
    key: "permissoes-usuarios",
    icon: IconUser,
    alt: "Usuários",
    size: 20,
    tab: "permissoes-usuarios",
  },
  {
    key: "armario-virtual",
    icon: IconClothes,
    alt: "Armário",
    size: 24,
    tab: "armario-virtual",
  },
  {
    key: "upgrades",
    icon: IconUpgrades,
    alt: "Upgrades",
    size: 24,
    tab: "upgrades",
  },
  {
    key: "cargarage",
    icon: IconGarage,
    alt: "Garagem",
    size: 24,
    tab: "garagem",
  },
  {
    key: "taxas",
    icon: IconTaxas,
    alt: "Taxas",
    size: 24,
    tab: "taxas",
  },
];

const App: React.FC = () => {
  const { loaderState, showLoader, hideLoader } = useLoader();

  const { visible, setVisible } = useVisibility();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  useNuiEvent<boolean>("setVisible", setVisible);

  const handleClose = () => {
    setVisible(false);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  if (!visible) return null;

  if (loaderState.show)
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
        <div className="modal-cut-corners bg-[#0F0F12] w-full max-w-[80%] h-full max-h-[90vh] flex items-center justify-center">
          <Loader
            show={loaderState.show}
            message={loaderState.message}
            variant={loaderState.variant}
          />
        </div>
      </div>
    );

  // showLoader("Carregando dados...", "spinner");

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
      <div className="modal-cut-corners bg-[#0F0F12] w-full max-w-[80%] h-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-8 pl-12">
          <div className="flex gap-6 flex-col">
            <div className="flex items-center mt-5 justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#FF204E] w-9 rounded-lg h-9 flex items-center justify-center">
                  <IconHome size={20} color="white" />
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-2xl">
                    {activeTab === "dashboard"
                      ? "Home"
                      : activeTab === "permissoes-usuarios"
                      ? "Permissões de Usuários"
                      : activeTab === "armario-virtual"
                      ? "Armário Virtual"
                      : activeTab === "upgrades"
                      ? "Upgrades"
                      : activeTab === "garagem"
                      ? "Garagem"
                      : activeTab === "taxas"
                      ? "Taxas"
                      : ""}
                  </h2>
                
                </div>
              </div>
              <div className="flex items-center gap-3 flex-row justify-center">
                <div className="flex gap-2 px-4 py-2  border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-[6px]">
                  {menus.map((menu) => (
                    <div
                      key={menu.key}
                      onClick={() =>
                        menu.tab && handleTabChange(menu.tab as TabType)
                      }
                      className={cn(
                        "w-8 h-8 rounded-[6px] flex items-center justify-center group relative cursor-pointer",
                        activeTab === menu.tab && "bg-[#FF204E]"
                      )}
                    >
                      <menu.icon
                        size={menu.size}
                        color={activeTab === menu.tab ? "white" : "#9CA3AF"}
                      />
                      {/* Tooltip customizado */}
                      <span
                        className={cn(
                          "pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-12 z-20 px-3 py-1 rounded-md bg-[#fff] text-[#171717] text-xs font-bold whitespace-nowrap shadow transition-opacity duration-200",
                          "opacity-0 group-hover:opacity-100"
                        )}
                      >
                        {menu.alt}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleClose}
                  className="p-3 rounded-md flex items-center justify-end border-[#FFFFFF1A] bg-[#1e1e21]"
                >
                  <X />
                </button>
              </div>
            </div>
          </div>
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "permissoes-usuarios" && <PermissoesUsuarios />}
          {activeTab === "armario-virtual" && <ArmarioVirtual />}
          {activeTab === "upgrades" && <Upgrades />}
          {activeTab === "garagem" && <Garage />}
          {activeTab === "taxas" && <Taxas />}
        </div>
      </div>
    </div>
  );
};

export default App;
