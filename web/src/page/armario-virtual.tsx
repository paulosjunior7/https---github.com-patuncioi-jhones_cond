import { Lock, Plus, Search } from "lucide-react";

export default function ArmarioVirtual() {
  return (
    <div className="flex gap-6 flex-col py-10">
      <div className="flex-row flex justify-between items-center">
        <p className="font-semibold text-lg">Seus outfits salvos</p>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="text-gray-400 size-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              className="bg-[#1e1e21] pl-10 border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-[270px] font-semibold"
              placeholder="Pesquisar"
            />
          </div>
          <button className="bg-[#FF204E] w-auto font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
            <Plus className="size-4 mr-2" />
            Salvar novo visual
          </button>
        </div>
      </div>
      <div className="flex flex-wrap rounded-lg  gap-4 max-h-[400px] overflow-y-auto pr-4">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="border w-[120px] h-[120px] border-[#FFFFFF1A] py-2 items-center justify-center flex flex-col gap-2 bg-[#1e1e21] rounded-lg"
          >
            <div className="rounded-full  border-[0.5px] bg-[#27272a] border-[#FFFFFF1A] w-[42px] h-[42px] flex items-center justify-center">
              <Lock className="text-white size-[18px] " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
