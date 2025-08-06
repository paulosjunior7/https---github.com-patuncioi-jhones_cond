import { ToastMessage } from "@/components/ToastMessage";
import { useResponsive } from "@/hooks/useResponsive";
import { fetchNui } from "@/utils/fetchNui";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface MockResponse {
  id: number;
  name: string;
  title: string;
  locked: boolean;
}

const mockResponse: MockResponse[] = [
  {
    id: 1,
    name: "Barber Shop",
    title: "Loja de Barbearia",
    locked: false,
  },
  {
    id: 2,
    name: "SkinShop",
    title: "Loja de Roupas",
    locked: false,
  },
];

interface Response {
  message: string;
  success: boolean;
}

const PainelContext = () => {
  const [contextos, setContext] = useState<MockResponse[]>([]);
  const [filteredcontextos, setFilteredContext] = useState<MockResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { isSmall, isMedium } = useResponsive();

  const loadContext = () => {
    setLoading(true);
    setTimeout(() => {
      setContext(mockResponse);
      setFilteredContext(mockResponse);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredContext(contextos);
    } else {
      const filtered = contextos.filter(
        (contexto) =>
          contexto.name.toLowerCase().includes(term.toLowerCase()) ||
          contexto.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredContext(filtered);
    }
  };

  const handleOpen = async (id: number) => {
    try {
      const response: Response = await fetchNui("jhones_cond:openLoja", {
        id,
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
        loadContext();
      }
    } catch (error) {
      console.error("Erro ao retirar veículo:", error);
    }
  };

  useEffect(() => {
    loadContext();
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
          Lista de lojas
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
        ) : filteredcontextos.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-lg">
              {searchTerm
                ? "Nenhum veículo encontrado"
                : "Nenhum veículo disponível"}
            </div>
          </div>
        ) : (
          filteredcontextos.map((vehicle) => (
            <div
              key={vehicle.title}
              className={`border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 flex items-center justify-between ${
                isSmall ? "flex-col gap-4" : "flex-row"
              }`}
            >
              <div className="flex items-center gap-4 flex-row">
                <div className="flex flex-row gap-3">
                  <h3
                    className={`font-bold text-white ${
                      isSmall ? "text-base" : "text-lg"
                    }`}
                  >
                    {vehicle.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span>{vehicle.title}</span>
                  </div>
                </div>
              </div>
              <div>
                <>
                  <button
                    onClick={() => {
                      handleOpen(vehicle.id);
                    }}
                    className={`bg-[#FF204E] hover:bg-[#FF204E]/80 font-semibold flex items-center text-white rounded-lg ${
                      isSmall
                        ? "w-full justify-center px-4 py-2 h-[35px] text-xs"
                        : "px-4 py-2 h-[38px] text-sm"
                    }`}
                  >
                    Abrir
                  </button>
                </>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PainelContext;
