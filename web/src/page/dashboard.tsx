import { useEffect, useState } from "react";
import { Switch } from "../components/ui/switch";
import { cn } from "../lib/utils";
import { useResponsive } from "../hooks/useResponsive";
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
  const { isSmall, isMedium, isLarge, isXLarge } = useResponsive();
  const [data, setData] = useState<HomeData | null>(null);

  const loadHomeData = () => {
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
    <>
      {loaderState.show && <Loader />}
      <div className="dashboard-container flex gap-2 sm:gap-4 lg:gap-6 flex-col p-1 sm:p-2 lg:p-4 xl:p-6">
        <p className="title-responsive font-semibold text-xs sm:text-sm lg:text-base xl:text-lg">
          Informações da residencia
        </p>
        <div className="residence-card  min-h-[80px] sm:h-[140px] lg:h-[150px] xl:h-[160px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full relative flex-col sm:flex-row">
          <div className="w-full sm:w-[200px] md:w-[240px] lg:w-[265px] residence-image h-[60px] sm:h-full relative">
            <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-l from-transparent via-black/40 to-black/80 z-10 rounded-t-lg"></div>
            <img
              src="/assets/hero1.png"
              alt="Casa Branca Nivel 3"
              className="h-full w-full object-cover rounded-t-lg sm:rounded-lg"
            />
          </div>

          {/* Lista de Residências */}
          <div
            className={"grid grid-cols-3  gap-2 sm:gap-2 md:gap-4 w-full p-4"}
          >
            <div className="flex flex-col  justify-between gap-1 sm:gap-2 lg:gap-0">
              <div>
                <p className="text-responsive text-gray-400 text-xs">
                  Nome da residencia
                </p>
                <p className="text-white font-bold text-xs sm:text-sm lg:text-base break-words">
                  {data?.residenceName}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-responsive text-gray-400 text-xs">
                  Data de vencimento da taxa
                </p>
                <p className="text-white font-bold text-xs sm:text-sm lg:text-base">
                  {data?.expireTax}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-1 sm:gap-2 lg:gap-0">
              <div>
                <p className="text-responsive text-gray-400 text-xs">
                  Total de usuários cadastrados
                </p>
                <p className="text-white font-bold text-xs sm:text-sm lg:text-base">
                  {data?.totalUsers} Membros
                </p>
              </div>

              <div>
                <p className="text-responsive text-gray-400 text-xs">
                  Total de roupas salvas
                </p>
                <p className="text-white font-bold text-xs sm:text-sm lg:text-base">
                  {data?.totalClothes} Roupas
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <div className="flex items-center gap-1 sm:gap-2 bg-[#242528] p-1 sm:p-2 lg:p-3 rounded-lg w-fit">
                <Switch
                  checked={data?.dangerZoneStatus || false}
                  onCheckedChange={(checked) => {
                    handleChangeDangerZone(checked);
                  }}
                />
                <span className="button-responsive text-xs font-medium text-white select-none">
                  DangerZone
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 lg:gap-6 flex-col">
          <p className="title-responsive font-semibold text-xs sm:text-sm lg:text-base xl:text-lg">
            Controle de portas
          </p>
          <div className="flex gap-1 sm:gap-2 flex-col">
            {data?.newState.map((door: DoorState, index: number) => (
              <div
                key={index}
                className="door-item min-h-[32px] sm:h-[44px] xl:h-[48px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full items-center p-1 sm:p-2 lg:p-3"
              >
                <div className="flex items-center gap-1 sm:gap-2 w-full min-w-0">
                  <div
                    className={cn(
                      "bg-[#FF204E] h-[20px] w-[20px] sm:h-[24px] sm:w-[24px] lg:h-[28px] lg:w-[28px] rounded-lg mr-1 sm:mr-2 flex items-center justify-center flex-shrink-0",
                      door?.state ? "bg-[#FF204E]" : "bg-[#28282b]"
                    )}
                  >
                    {door?.state ? (
                      <IconLocker size={isSmall ? 9 : 13} color="white" />
                    ) : (
                      <IconUnlocker size={isSmall ? 9 : 13} color="white" />
                    )}
                  </div>
                  <div className="text-responsive font-medium text-xs sm:text-sm lg:text-base truncate">
                    {door.name}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 sm:gap-2 flex-shrink-0">
                  <span className="text-responsive text-gray-400 text-xs select-none hidden sm:block">
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
    </>
  );
}
