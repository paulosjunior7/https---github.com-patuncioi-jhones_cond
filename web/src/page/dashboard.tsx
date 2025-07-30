import { useState } from "react";
import { Switch } from "../components/ui/switch";
import { cn } from "../lib/utils";
import { useClientData } from "../hooks/useClientData";
import { usePerformance } from "../hooks/usePerformance";
import useLoader from "@/hooks/useLoader";
import Loader from "@/components/Loader";
import { IconLocker, IconUnlocker } from "../components/icons";

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const ReturnClientDataComp: React.FC<{ data: ReturnData }> = ({ data }) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);

export default function Dashboard() {
  const [switchDangerZone, setSwitchDangerZone] = useState(false);
  const [switchPortaEntrada, setSwitchPortaEntrada] = useState(false);
  const [switchPortaFundos, setSwitchPortaFundos] = useState(false);

  // Usar hook otimizado com cache de 3 segundos e debounce de 200ms
  const {
    data: clientData,
    loading,
    error,
    refetch,
  } = useClientData({
    cacheTime: 3000,
    debounceTime: 200,
    autoRefresh: false, // Desabilitar auto-refresh para economizar recursos
  });

  // Monitor de performance
  // const { metrics, isLowPerformance } = usePerformance({
  //   enabled: true,
  //   interval: 2000,
  // });

  return (
    <div className="flex gap-6 flex-col">
      {/* Indicador de Performance (apenas em desenvolvimento) */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
          <h4 className="text-yellow-400 font-semibold mb-2">
            Performance Monitor
          </h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">FPS: </span>
              <span
                className={cn(
                  "font-bold",
                  metrics.fps > 50
                    ? "text-green-400"
                    : metrics.fps > 30
                    ? "text-yellow-400"
                    : "text-red-400"
                )}
              >
                {metrics.fps}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Render: </span>
              <span
                className={cn(
                  "font-bold",
                  metrics.renderTime < 16
                    ? "text-green-400"
                    : metrics.renderTime < 33
                    ? "text-yellow-400"
                    : "text-red-400"
                )}
              >
                {metrics.renderTime.toFixed(1)}ms
              </span>
            </div>
            <div>
              <span className="text-gray-400">Requests: </span>
              <span className="font-bold text-blue-400">
                {metrics.requestCount}
              </span>
            </div>
          </div>
          {isLowPerformance && (
            <div className="text-red-400 text-xs mt-2">
              ⚠️ Performance baixa detectada
            </div>
          )}
        </div>
      )} */}

      {/* Status dos dados */}
      {loading && (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
          <span className="text-blue-400">Carregando dados...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
          <span className="text-red-400">Erro: {error}</span>
        </div>
      )}

      <p className="font-semibold text-lg">Informações da residencia</p>
      <div className="h-[150px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full relative">
        <div className="w-[265px] h-full relative">
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-l from-transparent via-black/40 to-black/80 z-10 rounded-t-lg"></div>
          <img
            src="/assets/hero1.png"
            alt="Casa Branca Nivel 3"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        <div className=" p-6 grid grid-cols-3 flex-row w-full">
          <div className=" flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm">Nome da residencia</p>
              <p className="text-white font-bold text-md">
                Casa Branca Nivel 3
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-400 text-sm">
                Data de vencimento da taxa
              </p>
              <p className="text-white font-bold text-md">02/10/2025</p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm">
                Total de usuários cadastrados
              </p>
              <p className="text-white font-bold">14 Membros</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Total de roupas salvas</p>
              <p className="text-white font-bold">34 Roupas</p>
            </div>
          </div>
          <div className="justify-end items-center flex">
            <div className="flex items-center gap-2 bg-[#242528] p-3 rounded-lg">
              <Switch
                checked={switchDangerZone}
                onCheckedChange={setSwitchDangerZone}
              />
              <span className="text-sm font-medium text-white select-none">
                DangerZone
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 flex-col">
        <p className="font-semibold text-lg">Controle de portas</p>
        <div className="flex gap-2 flex-col">
          <div className="h-[44px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full items-center p-2 ">
            <div className="flex items-center gap-2 w-full">
              <div
                className={cn(
                  "bg-[#FF204E] h-[28px] w-[28px] rounded-lg mr-2 flex items-center justify-center",
                  switchPortaEntrada ? "bg-[#FF204E]" : "bg-[#28282b]"
                )}
              >
                <IconLocker size={13} color="white" />
              </div>
              <div className="font-medium text-base">Entrada principal</div>
            </div>
            <div className="flex items-center justify-end w-full gap-2">
              <span className="text-gray-400 text-sm select-none">
                {" "}
                {switchPortaEntrada ? "Trancado" : "Destrancado"}
              </span>
              <Switch
                checked={switchPortaEntrada}
                onCheckedChange={setSwitchPortaEntrada}
              />
            </div>
          </div>
          <div className="h-[44px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full items-center p-2 ">
            <div className="flex w-full items-center gap-2">
              <div
                className={cn(
                  "bg-[#28282b] h-[28px] w-[28px] rounded-lg  mr-2 flex items-center justify-center",
                  switchPortaFundos ? "bg-[#FF204E]" : "bg-[#28282b]"
                )}
              >
                {switchPortaFundos ? (
                  <IconLocker size={13} color="white" />
                ) : (
                  <IconUnlocker size={13} color="white" />
                )}
              </div>
              <div className="font-medium text-base select-none">
                Porta dos fundos
              </div>
            </div>
            <div className="flex items-center justify-end w-full gap-2">
              <span className="text-gray-400 text-sm">
                {switchPortaFundos ? "Trancado" : "Destrancado"}
              </span>
              <Switch
                checked={switchPortaFundos}
                onCheckedChange={setSwitchPortaFundos}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dados do cliente (apenas em desenvolvimento) */}
      {process.env.NODE_ENV === "development" && clientData && (
        <div className="bg-gray-900/20 border border-gray-500/30 rounded-lg p-3">
          <h4 className="text-gray-400 font-semibold mb-2">
            Client Data (Debug)
          </h4>
          <ReturnClientDataComp data={clientData} />
          <button
            onClick={refetch}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Refresh Data
          </button>
        </div>
      )}
    </div>
  );
}
