import { ToastMessage } from "@/components/ToastMessage";
import { useResponsive } from "@/hooks/useResponsive";
import { useVisibility } from "@/providers/VisibilityProvider";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface MockResponseContexto {
  title: string;
  contextList: ContextListItem[];
}
export interface ContextListItem {
  index: string;
  name: string;
  btnMessage: string;
  title: string;
  description: string;
  imageSrc: string;
  locked: boolean;
}

interface Response {
  message: string;
  success: boolean;
}

const PainelContext = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { isSmall, isMedium } = useResponsive();
  const { visibleContext, setVisibleContext } = useVisibility();

  const loadContext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleOpen = async (index: string) => {
    try {
      const response: Response = await fetchNui(
        "jhones_cond:sendIndexContext",
        {
          index,
        }
      );

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
        loadContext();
        setVisibleContext(null);
      }
    } catch (error) {
      console.error("Erro ao retirar veículo:", error);
    }
  };

  useEffect(() => {
    loadContext();
  }, [visibleContext]);

  return (
    <div className="flex gap-6 flex-col py-10 h-full z-[99999]">
      <div
        className={`flex justify-between items-center ${
          isSmall ? "flex-col gap-4" : "flex-row"
        }`}
      >
        <p
          className={`font-semibold ${
            isSmall ? "text-2xl" : isMedium ? "text-2xl" : "text-2xl"
          }`}
        >
          Lista de lojas
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-4 pb-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">Carregando Lojas...</div>
          </div>
        ) : visibleContext?.contextList?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            {"Não há lojas disponíveis no momento."}
          </div>
        ) : (
          visibleContext?.contextList?.map((context) => (
            <div
              key={context.title}
              className={`border border-[#0505051a] bg-[#1e1e21] rounded-lg flex overflow-hidden ${
                isSmall
                  ? "flex-col gap-4 items-center p-4"
                  : "flex-row items-center p-0"
              }`}
            >
              <img
                src={context.imageSrc}
                alt={context.title}
                className={`object-cover border-[#333] rounded-md ${
                  isSmall ? "w-20 h-20 mb-2" : "w-16 h-16 m-4"
                }`}
              />
              <div
                className={`flex-1 flex ${
                  isSmall
                    ? "flex-col items-center text-center gap-2"
                    : "flex-row items-center justify-between"
                } w-full`}
              >
                <div
                  className={`flex flex-col ${
                    isSmall ? "items-center" : "items-start ml-0"
                  }`}
                >
                  <h3
                    className={`font-bold text-white ${
                      isSmall ? "text-base" : "text-lg"
                    }`}
                  >
                    {context.name}
                  </h3>
                  <span className="text-gray-300">{context.title}</span>
                </div>
                <div
                  className={`${
                    isSmall ? "w-full mt-3 p-4" : "ml-4 flex-shrink-0 p-4"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleOpen(context.index);
                    }}
                    className={`bg-[#FF204E] hover:bg-[#FF204E]/80 font-semibold flex items-center text-white rounded-lg ${
                      isSmall
                        ? "w-full justify-center px-4 py-2 h-[35px] text-xs"
                        : "px-4 py-2 h-[38px] text-sm"
                    }`}
                  >
                    {context.btnMessage}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PainelContext;
