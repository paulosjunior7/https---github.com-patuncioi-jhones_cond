import { useEffect, useState } from "react";
import { Switch } from "../components/ui/switch";
import { cn } from "../lib/utils";
import { useClientData } from "../hooks/useClientData";
import { usePerformance } from "../hooks/usePerformance";
import useLoader from "@/hooks/useLoader";
import Loader from "@/components/Loader";
import { IconLocker, IconUnlocker } from "../components/icons";
import { fetchNui } from "@/utils/fetchNui";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";

type DoorState = {
  name: string;
  state: boolean;
  index: number;
};

interface HomeData {
  dangerZoneStatus: boolean;
  expireTax: string;
  newState: DoorState[];
  residenceName: string;
  totalClothes: number;
  totalUsers: number;
}

interface Response {
  message: string;
  success: boolean;
}

export default function Dashboard() {
  const { loaderState, showLoader, hideLoader } = useLoader();
  const [data, setData] = useState<HomeData | null>(null);

  const loadHomeData = () => {
    showLoader("Carregando dados...", "spinner");
    fetchNui("jhones_cond:getHomeData")
      .then((data) => {
        const homeData = data as HomeData;
        setData(homeData);
      })
      .finally(() => {
        hideLoader();
      });
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const handleChangeDoorState = async (index: number, checked: boolean) => {
    setData((prevData) => {
      if (!prevData) return null;
      const updatedState = prevData.newState.map((door) =>
        door.index === index ? { ...door, state: checked } : door
      );
      return { ...prevData, newState: updatedState };
    });

    const response: Response = await fetchNui("jhones_cond:doorsState", {
      index: index,
      state: checked,
    });

    if (response) {
      toast(
        <ToastMessage
          text={response.message}
          type={response.success ? "success" : "error"}
        />,
        {
          style: {
            display: "none",
          },
        }
      );
    }

    loadHomeData();
  };

  const handleChangeDangerZone = async (checked: boolean) => {
    setData((prevData) => {
      if (!prevData) return null;
      return { ...prevData, dangerZoneStatus: checked };
    });
    const response: Response = await fetchNui("jhones_cond:dangerZoneActived", {
      state: checked,
    });
    if (response) {
      toast(
        <ToastMessage
          text={response.message}
          type={response.success ? "success" : "error"}
        />,
        {
          style: {
            display: "none",
          },
        }
      );
    }
    loadHomeData();
  };

  return (
    <div className="flex gap-6 flex-col">
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
                {data?.residenceName}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-400 text-sm">
                Data de vencimento da taxa
              </p>
              <p className="text-white font-bold text-md">{data?.expireTax}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm">
                Total de usuários cadastrados
              </p>
              <p className="text-white font-bold">{data?.totalUsers} Membros</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Total de roupas salvas</p>
              <p className="text-white font-bold">
                {data?.totalClothes} Roupas
              </p>
            </div>
          </div>
          <div className="justify-end items-center flex">
            <div className="flex items-center gap-2 bg-[#242528] p-3 rounded-lg">
              <Switch
                checked={data?.dangerZoneStatus || false}
                onCheckedChange={(checked) => {
                  handleChangeDangerZone(checked);
                }}
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
          {data?.newState.map((door: DoorState, index: number) => (
            <div
              key={index}
              className="h-[44px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full items-center p-2 "
            >
              <div className="flex items-center gap-2 w-full">
                <div
                  className={cn(
                    "bg-[#FF204E] h-[28px] w-[28px] rounded-lg mr-2 flex items-center justify-center",
                    door?.state ? "bg-[#FF204E]" : "bg-[#28282b]"
                  )}
                >
                  {door?.state ? (
                    <IconLocker size={13} color="white" />
                  ) : (
                    <IconUnlocker size={13} color="white" />
                  )}
                </div>
                <div className="font-medium text-base">{door.name}</div>
              </div>
              <div className="flex items-center justify-end w-full gap-2">
                <span className="text-gray-400 text-sm select-none">
                  {door?.state ? "Trancado" : "Destrancado"}
                </span>
                <Switch
                  checked={door?.state}
                  onCheckedChange={(checked) => {
                    handleChangeDoorState(door.index, checked);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* Status dos dados */
}
{
  /* {false && (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
          <span className="text-blue-400">Carregando dados...</span>
        </div>
      )}

      {false && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
          <span className="text-red-400">Erro: {error}</span>
        </div>
      )} */
}
