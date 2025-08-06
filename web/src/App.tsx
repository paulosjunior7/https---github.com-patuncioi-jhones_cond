import { X } from "lucide-react";
import { useResponsive } from "./hooks/useResponsive";
import Painel from "./page/Painel";
import { useVisibility } from "./providers/VisibilityProvider";
import Garage from "./page/garage";
import { useNuiEvent } from "./hooks/useNuiEvent";
import PainelContext from "./page/PainelContext";

const App = () => {
  const { isSmall } = useResponsive();
  const {
    visibleGarage,
    setVisiblePainel,
    visiblePainel,
    setVisibleGarage,
    visibleContext,
    setVisibleContext,
  } = useVisibility();

  useNuiEvent<boolean>("setVisibleGarage", setVisibleGarage);
  useNuiEvent<boolean>("setVisiblePainel", setVisiblePainel);
  useNuiEvent<boolean>("setVisibleContext", setVisibleContext);

  if (visibleGarage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
        <div className="app-modal modal-cut-corners bg-[#0F0F12] w-full max-w-[98%] sm:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%] h-full max-h-[95vh] sm:max-h-[80vh] lg:max-h-[75vh] xl:max-h-[70vh] flex flex-col overflow-hidden">
          <div className="p-3 sm:p-5 lg:p-6 xl:p-8 pl-2 sm:pl-4 lg:pl-8 xl:pl-12">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setVisibleGarage(false)}
                className="button-responsive p-1 sm:p-2 lg:p-3 rounded-md flex items-center justify-end border-[#FFFFFF1A] bg-[#1e1e21] hover:bg-[#2a2a2d] transition-colors"
              >
                <X size={isSmall ? 14 : 18} />
              </button>
            </div>
            <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-6 flex-col">
              <Garage />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visiblePainel) return <Painel />;

  if (visibleContext)
    return (
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
        <div className="app-modal modal-cut-corners bg-[#0F0F12] !w-[30%] max-w-[30%] sm:max-w-[30%] lg:max-w-[30%] xl:max-w-[30%] h-full max-h-[40vh] sm:max-h-[40vh] lg:max-h-[40vh] xl:max-h-[40vh] flex flex-col overflow-hidden">
          <div className="p-3 sm:p-5 lg:p-6 xl:p-8 pl-2 sm:pl-4 lg:pl-8 xl:pl-12">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setVisibleGarage(false)}
                className="button-responsive p-1 sm:p-2 lg:p-3 rounded-md flex items-center justify-end border-[#FFFFFF1A] bg-[#1e1e21] hover:bg-[#2a2a2d] transition-colors"
              >
                <X size={isSmall ? 14 : 18} />
              </button>
            </div>
            <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-6 flex-col">
              <PainelContext />
            </div>
          </div>
        </div>
      </div>
    );
};

export default App;
