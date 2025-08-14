import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { fetchNui } from "@/utils/fetchNui";
import { ToastMessage } from "@/components/ToastMessage";
import { toast } from "sonner";

interface VehicleData {
  VehType: string;
  arrest: number;
  arrest_expire: string;
  expire_tax: string;
  insurance: number;
  ipvaValue: number;
  plate: string;
  spawnName: string;
  vehicleName: string;
  isOut?: boolean; // Adicionado para controlar se está fora da garagem
}

type VehiclesResponse = VehicleData[];

interface Response {
  message: string;
  success: boolean;
}

export default function Garage() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { isSmall, isMedium } = useResponsive();

  const loadVehicles = () => {
    setLoading(true);
    fetchNui("jhones_cond:getUserVehicles")
      .then((data) => {
        const response = data as VehiclesResponse;
        console.log("Carregando veículos:", JSON.stringify(response));
        setVehicles(response || []);
        setFilteredVehicles(response || []);
      })
      .catch((error) => {
        console.error("Erro ao carregar veículos:", error);
        setVehicles([]);
        setFilteredVehicles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter(
        (vehicle) =>
          vehicle.vehicleName.toLowerCase().includes(term.toLowerCase()) ||
          vehicle.plate.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
  };

  const handleRetireVehicle = async (vehicle: VehicleData) => {
    try {
      const response: Response = await fetchNui("jhones_cond:retireVehicle", {
        spawnName: vehicle.spawnName,
        plate: vehicle.plate,
      });

      if (response) {
        toast(
          <ToastMessage
            text={response.message}
            type={response.success ? "success" : "error"}
          />,
          {
            duration: 5000,
            style: {
              display: "none",
            },
          }
        );
      }

      if (response.success) {
        loadVehicles();
      }
    } catch (error) {
      console.error("Erro ao retirar veículo:", error);
    }
  };

  const handleGuardVehicle = async (vehicle: VehicleData) => {
    try {
      const response: Response = await fetchNui("jhones_cond:guardVehicle", {
        spawnName: vehicle.spawnName,
        plate: vehicle.plate,
      });

      if (response) {
        toast(
          <ToastMessage
            text={response.message}
            type={response.success ? "success" : "error"}
          />,
          {
            duration: 5000,
            style: {
              display: "none",
            },
          }
        );
      }

      if (response.success) {
        loadVehicles();
      }
    } catch (error) {
      console.error("Erro ao guardar veículo:", error);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return (
    <div className="flex gap-6 flex-col py-10 h-full">
      <div
        className={`flex justify-between items-center ${
          isSmall ? "flex-col gap-4" : "flex-row"
        }`}
      >
        <p
          className={`font-semibold ${
            isSmall ? "text-sm" : isMedium ? "text-base" : "text-lg"
          }`}
        >
          Lista de veículos
        </p>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="text-gray-400 size-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={`bg-[#1e1e21] pl-10 border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] font-semibold ${
                isSmall ? "w-[200px]" : "w-[270px]"
              }`}
              placeholder="Pesquisar"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-4 pb-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">Carregando veículos...</div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-lg">
              {searchTerm
                ? "Nenhum veículo encontrado"
                : "Nenhum veículo disponível"}
            </div>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.plate}
              className={`border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 flex items-center justify-between ${
                isSmall ? "flex-col gap-4" : "flex-row"
              }`}
            >
              <div className="flex items-center gap-4 flex-row">
                <div className="bg-[#8CFF001A] p-1 rounded-full flex items-center justify-center">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      vehicle.arrest === 0
                        ? vehicle.isOut
                          ? "bg-[#FFA500]"
                          : "bg-[#8CFF00]"
                        : "bg-[#FF204E]"
                    )}
                  ></div>
                </div>
                <div className="flex flex-row gap-3">
                  <h3
                    className={`font-bold text-white ${
                      isSmall ? "text-base" : "text-lg"
                    }`}
                  >
                    {vehicle.vehicleName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-bold px-2 py-1 rounded",
                        vehicle.arrest === 0
                          ? "bg-[#FF204E] text-black"
                          : "bg-[#28282b] text-gray-400"
                      )}
                    >
                      {vehicle.plate}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`flex gap-2 items-center ${
                  isSmall ? "w-full justify-between flex-col" : "flex-row"
                }`}
              >
                {vehicle.arrest === 0 ? (
                  <>
                    <button
                      onClick={() => handleRetireVehicle(vehicle)}
                      className={`border-[#FFFFFF1A] border hover:bg-[#FFFFFF1A] font-semibold flex items-center text-white rounded-lg ${
                        isSmall
                          ? "w-full justify-center px-4 py-2 h-[35px] text-xs"
                          : "px-4 py-2 h-[38px] text-sm"
                      }`}
                    >
                      Retirar veículo
                    </button>
                    <button
                      onClick={() => handleGuardVehicle(vehicle)}
                      className={`bg-[#FF204E] hover:bg-[#FF204E]/80 font-semibold flex items-center text-white rounded-lg ${
                        isSmall
                          ? "w-full justify-center px-4 py-2 h-[35px] text-xs"
                          : "px-4 py-2 h-[38px] text-sm"
                      }`}
                    >
                      Guardar veículo
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className={`bg-[#FF204E]/50 font-semibold flex items-center text-white rounded-lg cursor-not-allowed ${
                      isSmall
                        ? "w-full justify-center px-4 py-2 h-[35px] text-xs"
                        : "px-4 py-2 h-[38px] text-sm"
                    }`}
                  >
                    Veículo Apreendido
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
