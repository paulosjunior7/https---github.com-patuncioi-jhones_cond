import { useResponsive } from "@/hooks/useResponsive";
import { useVisibility } from "@/providers/VisibilityProvider";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface MockResponseContexto {
  title: string;
  contextList: ContextListItem[];
  onItemAction?: (index: string) => Promise<void>; // Função customizada simplificada
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
      // Se existe uma função customizada, usa ela
      if (visibleContext?.onItemAction) {
        await visibleContext.onItemAction(index);
        return;
      }

      // Caso contrário, usa o comportamento padrão
      const response: Response = await fetchNui(
        "jhones_cond:sendIndexContext",
        {
          index: index,
        }
      );

      console.log("Response:", JSON.stringify(response));

      if (response) {
        toast(
          <div className="flex items-center gap-3 flex-row text-base font-semibold">
            <div
              className={`bg-[#FF204E] min-w-6 rounded-full size-6 flex items-center justify-center`}
            >
              {response.success ? (
                <svg
                  className="text-white size-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="text-white size-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <span className="text-white text-sm font-semibold">
              {response.message}
            </span>
          </div>,
          {
            position: "top-right",
            duration: 5000,
            style: {
              background:
                "linear-gradient(90deg, rgba(255, 32, 78, 0.15) 0%, rgba(255, 32, 78, 0.08) 30%, rgba(255, 32, 78, 0.02) 60%, rgba(255, 32, 78, 0) 100%), linear-gradient(0deg, rgba(34, 34, 37, 0.98), rgba(34, 34, 37, 0.98))",
              color: "white",
              borderRadius: "300px",
              padding: "14px 18px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              minWidth: "140px",
            },
          }
        );
      }

      if (response.success) {
        loadContext();
        setVisibleContext(null);
      }
    } catch (error) {
      console.error("Erro ao executar ação:", error);
    }
  };

  useEffect(() => {
    loadContext();
  }, [visibleContext]);

  console.log("Visible Context:", JSON.stringify(visibleContext?.contextList));

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
          {visibleContext?.title || "Não encontrado"}
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
          visibleContext?.contextList?.map((context, index) => (
            <div
              key={context.title + index}
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
                    {context.title}
                  </h3>
                  <span className="text-gray-300">{context.description}</span>
                </div>
                <div
                  className={`${
                    isSmall ? "w-full mt-3 p-4" : "ml-4 flex-shrink-0 p-4"
                  }`}
                >
                  <button
                    onClick={() => {
                      console.log(
                        "Abrindo contexto:",
                        JSON.stringify(context.index)
                      );
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
