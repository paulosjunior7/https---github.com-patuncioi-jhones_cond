import { X } from "lucide-react";
import { useResponsive } from "./hooks/useResponsive";
import Painel from "./page/Painel";
import { useVisibility } from "./providers/VisibilityProvider";
import Garage from "./page/garage";
import PainelContext, { type MockResponseContexto } from "./page/PainelContext";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { useEffect, useState } from "react";
import { fetchNui } from "./utils/fetchNui";

const App = () => {
  const { isSmall } = useResponsive();
  const [backendHealth, setBackendHealth] = useState<
    "checking" | "healthy" | "unhealthy"
  >("checking");

  const {
    visibleGarage,
    setVisiblePainel,
    visiblePainel,
    setVisibleGarage,
    visibleContext,
    setVisibleContext,
  } = useVisibility();

  // Health check do backend
  useEffect(() => {
    let healthInterval: NodeJS.Timeout;

    const checkBackendHealth = async () => {
      try {
        await fetchNui("health");
        setBackendHealth("healthy");
        console.log("✅ Backend está disponível");
      } catch (error) {
        setBackendHealth("unhealthy");
        console.error("❌ Backend não está disponível:", error);
      }
    };

    // Aguarda um pouco antes da primeira verificação para evitar conflitos
    const initialDelay = setTimeout(() => {
      checkBackendHealth();

      // Verifica a cada 30 segundos após a primeira verificação
      healthInterval = setInterval(checkBackendHealth, 30000);
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      if (healthInterval) {
        clearInterval(healthInterval);
      }
    };
  }, []);

  console.log(JSON.stringify("renderizando"));

  const contextIsTrue = visibleContext && visibleContext?.title !== "";
  useNuiEvent<boolean>("setVisibleGarage", setVisibleGarage);
  useNuiEvent<boolean>("setVisiblePainel", setVisiblePainel);
  useNuiEvent<MockResponseContexto | null>("setVisibleContext", (data) =>
    setVisibleContext(data)
  );

  // Prioridade: Context > Garage > Painel
  // O VisibilityProvider controla a renderização através de condicionais
  // mas não altera os estados dos outros painéis

  // Componente de Health Status
  const HealthIndicator = () => (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${
          backendHealth === "checking"
            ? "bg-yellow-500/20 text-yellow-400"
            : backendHealth === "healthy"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            backendHealth === "checking"
              ? "bg-yellow-400 animate-pulse"
              : backendHealth === "healthy"
              ? "bg-green-400"
              : "bg-red-400 animate-pulse"
          }`}
        />
        {backendHealth === "checking"
          ? "Verificando..."
          : backendHealth === "healthy"
          ? "Backend OK"
          : "Backend Offline"}
      </div>
    </div>
  );

  if (contextIsTrue) {
    return (
      <>
        <HealthIndicator />
        <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
          <div className="app-modal modal-cut-corners bg-[#0F0F12] !w-[30%] max-w-[30%] sm:max-w-[30%] lg:max-w-[30%] xl:max-w-[30%] h-full max-h-[40vh] sm:max-h-[40vh] lg:max-h-[40vh] xl:max-h-[40vh] flex flex-col overflow-hidden">
            <div className="p-3 sm:p-5 lg:p-6 xl:p-8 pl-2 sm:pl-4 lg:pl-8 xl:pl-12">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setVisibleContext(null)}
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
      </>
    );
  }

  if (visibleGarage) {
    return (
      <>
        <HealthIndicator />
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
      </>
    );
  }

  if (visiblePainel) {
    return (
      <>
        <HealthIndicator />
        <Painel />
      </>
    );
  }

  return (
    <>
      <HealthIndicator />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="text-gray-400 text-sm">
          Aguardando abertura do painel...
        </div>
      </div>
    </>
  );
};
export default App;
