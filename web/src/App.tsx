import React, { useState } from "react";
import { debugData } from "./utils/debugData";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { useVisibility } from "./providers/VisibilityProvider";
import { useResponsive } from "./hooks/useResponsive";
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
import Upgrades from "./page/upgrades";
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
  const { loaderState } = useLoader();
  const { isSmall, isMedium } = useResponsive();

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
      <div className="fixed inset-0 bg-white flex items-center justify-center p-2 sm:p-4">
        <div className="modal-cut-corners bg-transparent w-full max-w-[95%] sm:max-w-[85%] lg:max-w-[80%] h-full max-h-[95vh] sm:max-h-[90vh] flex items-center justify-center">
          <Loader
            show={loaderState.show}
            message={loaderState.message}
            variant={loaderState.variant}
          />
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
      <div className="app-modal modal-cut-corners p-6 bg-[#0F0F12] w-full max-w-[98%] sm:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%] h-full max-h-[95vh] sm:max-h-[80vh] lg:max-h-[75vh] xl:max-h-[70vh] flex flex-col overflow-hidden">
        <div className="p-3 sm:p-5 lg:p-6 xl:p-8 pl-2 sm:pl-4 lg:pl-8 xl:pl-12">
          <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-6 flex-col">
            <div className="app-header flex items-center mt-1 sm:mt-2 lg:mt-3 xl:mt-5 justify-between flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-0">
              <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4">
                <div className="bg-[#FF204E] w-6 sm:w-7 lg:w-8 xl:w-9 rounded-lg h-6 sm:h-7 lg:h-8 xl:h-9 flex items-center justify-center">
                  <IconHome
                    size={isSmall ? 14 : isMedium ? 16 : 18}
                    color="white"
                  />
                </div>
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 overflow-x-hidden">
                  <h2 className="title-responsive font-bold text-xs sm:text-base lg:text-lg xl:text-xl text-center sm:text-left">
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
              <div className="flex items-center gap-2 sm:gap-3 flex-row justify-center">
                <div
                  className={cn(
                    "nav-tabs flex gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-[6px] overflow-x-auto scrollbar-hide",
                    isSmall ? "overflow-visible" : ""
                  )}
                >
                  {menus.map((menu) => (
                    <div
                      key={menu.key}
                      onClick={() =>
                        menu.tab && handleTabChange(menu.tab as TabType)
                      }
                      className={cn(
                        "nav-tab-icon w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-[6px] flex items-center justify-center group relative cursor-pointer flex-shrink-0",
                        activeTab === menu.tab && "bg-[#FF204E]"
                      )}
                    >
                      <menu.icon
                        size={
                          isSmall
                            ? Math.max(menu.size - 8, 12)
                            : isMedium
                            ? Math.max(menu.size - 4, 16)
                            : menu.size
                        }
                        color={activeTab === menu.tab ? "white" : "#9CA3AF"}
                      />
                      {/* Tooltip customizado */}
                      <span
                        className={cn(
                          "pointer-events-none absolute left-1/2 -translate-x-1/2 px-1 sm:px-2 lg:px-3 py-1 rounded-md bg-[#fff] text-[#171717] font-bold whitespace-nowrap shadow transition-opacity duration-200",
                          "opacity-0 group-hover:opacity-100",
                          isSmall
                            ? "bottom-7 z-50 text-[10px]"
                            : isMedium
                            ? "bottom-8 z-40 text-xs"
                            : "bottom-6 sm:bottom-8 lg:bottom-10 xl:bottom-12 z-20 text-xs"
                        )}
                      >
                        {menu.alt}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleClose}
                  className="button-responsive p-1 sm:p-2 lg:p-3 rounded-md flex items-center justify-end border-[#FFFFFF1A] bg-[#1e1e21] hover:bg-[#2a2a2d] transition-colors"
                >
                  <X size={isSmall ? 14 : 18} />
                </button>
              </div>
            </div>
          </div>
          <div className="content-scroll flex-1 overflow-y-auto overflow-x-hidden">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "permissoes-usuarios" && <PermissoesUsuarios />}
            {activeTab === "armario-virtual" && <ArmarioVirtual />}
            {activeTab === "upgrades" && <Upgrades />}
            {activeTab === "garagem" && <Garage />}
            {activeTab === "taxas" && <Taxas />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
