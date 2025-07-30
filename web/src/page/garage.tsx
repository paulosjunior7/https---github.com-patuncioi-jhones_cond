import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function Garage() {
  return (
    <div className="flex gap-6 flex-col py-10">
      <div className="flex-row flex justify-between items-center">
        <p className="font-semibold text-lg">Lista de veículos</p>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="text-gray-400 size-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              className="bg-[#1e1e21] pl-10 border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-[270px] font-semibold"
              placeholder="Pesquisar"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className="border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-row">
              <div className="bg-[#8CFF001A] p-1 rounded-full flex items-center justify-center">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    index === 0 ? "bg-[#8CFF00]" : "bg-[#FF204E]"
                  )}
                ></div>
              </div>
              <div className="flex flex-row gap-3">
                <h3 className="font-bold text-white text-lg">Mustang LX</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-bold px-2 py-1 rounded",
                      index === 0
                        ? "bg-[#FF204E] text-white"
                        : "bg-[#28282b] text-gray-400"
                    )}
                  >
                    3DCE43
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <button className=" w-auto border-[#FFFFFF1A] border hover:bg-[#FFFFFF1A] font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
                Retirar veículo
              </button>
              <button className="bg-[#FF204E] hover:bg-[#FF204E]/80 w-auto font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
                Guardar veículo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
