import { IconClothes } from "@/components/icons";
import { ToastMessage } from "@/components/ToastMessage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchNui } from "@/utils/fetchNui";
import { Check, Lock, Pencil, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Outfit {
  id: number;
  locked: boolean;
  name: string;
  hasClothe?: boolean;
}

interface Response {
  message: string;
  success: boolean;
}

type Outfits = Outfit[];

export default function ArmarioVirtual() {
  const [data, setData] = useState<Outfits | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOutfitName, setNewOutfitName] = useState("");
  const [editingOutfitName, setEditingOutfitName] = useState("");

  const loadOutfits = () => {
    fetchNui("jhones_cond:getOutFit").then((data) => {
      const outfits = data as Outfits;
      setData(outfits);
    });
  };

  useEffect(() => {
    loadOutfits();
  }, []);

  const handleDeleteOutfit = async (id: number) => {
    setData((prev) => prev?.filter((outfit) => outfit.id !== id) || null);

    const response: Response = await fetchNui("jhones_cond:deleteOutFit", {
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
  };

  const handleEditarOutfit = async (id: number, name: string) => {
    setData(
      (prev) =>
        prev?.map((outfit) =>
          outfit.id === id ? { ...outfit, name } : outfit
        ) || null
    );
    const response: Response = await fetchNui("jhones_cond:setOutFit", {
      id,
      name,
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

    loadOutfits();
    setNewOutfitName("");
  };

  const handleAddOutfit = async (name: string) => {
    const response: Response = await fetchNui("jhones_cond:addOutfit", {
      name,
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
      setData((prev) => [
        ...(prev || []),
        { id: Date.now(), name, locked: false, hasClothe: false },
      ]);
      setNewOutfitName("");
    }

    loadOutfits();
    setNewOutfitName("");
  };

  const handleUseOutfit = async (id: number) => {
    const response: Response = await fetchNui("jhones_cond:useOutfit", {
      id,
    });
    console.log(JSON.stringify(response));

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

    loadOutfits();
    setNewOutfitName("");
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button className="bg-[#FF204E] w-auto font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
                  <Plus className="size-4 mr-2" />
                  Salvar novo visual
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px] p-10 modal-cut-corners">
                <DialogHeader className="flex gap-3">
                  <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                    <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                      <Check />
                    </div>
                    Salvar novo Outfit
                  </DialogTitle>
                  <DialogDescription className="font-normal text-base">
                    Crie um novo outfit para organizar suas roupas.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex w-full py-3">
                  <Input
                    type="text"
                    min="0"
                    className="bg-[#1e1e21] border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-full font-semibold"
                    placeholder="Nome da roupa"
                    value={newOutfitName}
                    onChangeCapture={(e) =>
                      setNewOutfitName((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div className="grid gap-6 py-3 grid-cols-2 overflow-y-auto max-h-[300px]  "></div>
                <DialogFooter className="flex w-full">
                  <div className="flex gap-2 w-full">
                    <div className="w-full">
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            handleAddOutfit(newOutfitName);
                          }}
                          disabled={!newOutfitName.trim()}
                          className="h-[40px] w-full font-semibold bg-[#FF204E]"
                        >
                          Confirmar salvamento
                        </Button>
                      </DialogClose>
                    </div>
                    <div className="w-full">
                      <DialogClose asChild>
                        <Button
                          className="h-[40px] w-full font-semibold bg-gray-600"
                          type="button"
                          onClick={() => setNewOutfitName("")}
                        >
                          Cancelar
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-wrap rounded-lg   gap-3 max-h-[400px] overflow-y-auto pr-4">
        {data
          ?.filter((outfit) =>
            outfit.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((outfit, idx) => (
            <div
              key={`${outfit.id}-${idx}`}
              className="border hover:border-[#FF204E] hover:cursor-pointer hover:bg-[#FF204E1A] relative w-[120px] h-[120px] border-[#FFFFFF1A] py-2 items-center justify-center flex flex-col gap-2 bg-[#1e1e21] rounded-lg group"
              onClick={(e) => {
                // Só dispara se clicar diretamente no card, não em botões internos
                if (outfit.hasClothe && e.target === e.currentTarget) {
                  handleUseOutfit(outfit.id);
                }
              }}
            >
              {outfit.hasClothe && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute hidden z-50 group-hover:flex top-10 left-0 bg-[#FF204E] rounded-full p-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash className="text-white size-[22px]" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] p-10 modal-cut-corners">
                    <DialogHeader className="flex gap-3">
                      <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                        <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                          <Check />
                        </div>
                        Excluir Outfit
                      </DialogTitle>
                      <DialogDescription className="font-normal text-base">
                        Confirma a exclusão do outfit?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex w-full py-3">
                      <Input
                        type="text"
                        disabled
                        min="0"
                        className="bg-[#1e1e21] border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-full font-semibold"
                        placeholder="Nome da roupa"
                        defaultValue={outfit.name}
                      />
                    </div>
                    <div className="grid gap-6 py-3 grid-cols-2 overflow-y-auto max-h-[300px]  "></div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() => handleDeleteOutfit(outfit.id)}
                          className="h-[40px] w-full font-semibold bg-[#FF204E]"
                        >
                          Confirmar exclusão
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {outfit.hasClothe && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute z-50 hidden group-hover:flex top-1 left-0 bg-[#FF204E] rounded-full p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingOutfitName(outfit.name);
                      }}
                    >
                      <Pencil className="text-white size-[20px]" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] p-10 modal-cut-corners">
                    <DialogHeader className="flex gap-3">
                      <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                        <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                          <Check />
                        </div>
                        Editar Outfit
                      </DialogTitle>
                      <DialogDescription className="font-normal text-base">
                        Edite as informações do seu outfit.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex w-full py-3">
                      <Input
                        type="text"
                        min="0"
                        className="bg-[#1e1e21] border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-full font-semibold"
                        placeholder="Nome da roupa"
                        value={editingOutfitName}
                        onChange={(e) => setEditingOutfitName(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <div className="w-full">
                        <DialogClose asChild>
                          <Button
                            className="h-[40px]  w-full font-semibold bg-[#28282b] text-white"
                            onClick={() => setEditingOutfitName("")}
                          >
                            Cancelar
                          </Button>
                        </DialogClose>
                      </div>
                      <div>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              handleEditarOutfit(outfit.id, editingOutfitName);
                            }}
                            className="h-[40px] w-full font-semibold bg-[#FF204E]"
                            disabled={!editingOutfitName.trim()}
                          >
                            Confirmar alteração
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              <div className="rounded-full  border-[0.5px] bg-[#27272a] border-[#FFFFFF1A] w-[42px] h-[42px] flex items-center justify-center">
                {outfit.locked ? (
                  <Lock className="text-white size-[18px] " />
                ) : outfit.hasClothe ? (
                  <IconClothes className="text-white size-[18px] " />
                ) : (
                  <Plus className="text-white size-[18px] " />
                )}
              </div>
              {outfit.hasClothe && (
                <>
                  <span className="text-xs group-hover:hidden font-normal text-center">
                    {outfit.name.length > 30
                      ? `${outfit.name.slice(0, 30)}...`
                      : outfit.name}
                  </span>
                  <span className="group-hover:block uppercase hidden text-xs font-normal text-center">
                    Clique para usar
                  </span>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
