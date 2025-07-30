import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Check, Pencil, Plus, Search, User, UserX } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function PermissoesUsuarios() {
  return (
    <div className="flex gap-6 flex-col py-10">
      <div className="flex-row flex justify-between items-center">
        <p className="font-semibold text-lg">Membros com permissões</p>
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
            Adicionar membro
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-col max-h-[400px] overflow-y-auto pr-4">
        {Array.from({ length: 10 }, (_, index) => (
          <div className="flex gap-2 px-4 py-2  justify-between border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-[6px]">
            <div className="flex items-center gap-3">
              <User className="text-gray-400 size-5" />
              <p className="text-base font-semibold text-white">
                Membro {index + 1}
              </p>
              <div className="bg-[#FF204E] text-sm font-semibold px-2 rounded-md">
                23
              </div>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <button className="text-gray-400 bg-[#28282b] p-2 rounded-lg hover:text-white">
                      <Pencil className="size-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] p-10 modal-cut-corners">
                    <DialogHeader className="flex gap-3">
                      <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                        <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                          <Check />
                        </div>
                        Permissões
                      </DialogTitle>
                      <DialogDescription className="font-normal text-base">
                        Gerencie as permissões deste membro na sua residência.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex w-full py-3">
                      <Input
                        type="number"
                        min="0"
                        className="bg-[#1e1e21] border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-full font-semibold"
                        placeholder="Passaporte"
                      />
                    </div>
                    <div className="grid gap-6 py-3 grid-cols-2 overflow-y-auto max-h-[300px]  ">
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-400">
                          Abrir Portas
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-400">
                          Abrir garagem
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-400">
                          abrir loja de roupas
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-400">
                          Abrir tatuagem
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-400">
                          Abrir menu de barbearia
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-400">
                          Abrir baú da casa
                        </span>
                        <Switch />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild></DialogClose>
                      <Button
                        type="submit"
                        className="h-[40px] w-full font-semibold bg-[#FF204E]"
                      >
                        Confirmar alteração
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>

              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <button className="bg-[#FF204E] p-2 rounded-lg text-gray-400 hover:text-white">
                      <UserX className="size-4 text-white" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] p-10 modal-cut-corners">
                    <DialogHeader className="flex gap-3">
                      <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                        <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                          <Check />
                        </div>
                        Exclusão
                      </DialogTitle>
                      <DialogDescription className="font-normal text-base">
                        O senhor(a) realmente deseja remover este membro da
                        residência?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <div className="flex flex-row w-full gap-2 sm:max-w-[425px] justify-between">
                        <div className="w-full">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="h-[40px]  w-full font-semibold bg-[#28282b] text-white"
                              onClick={() => {}}
                            >
                              Cancelar
                            </Button>
                          </DialogClose>
                        </div>
                        <div className="w-full">
                          <Button
                            type="submit"
                            className="h-[40px] w-full font-semibold bg-[#FF204E]"
                          >
                            Confirmar
                          </Button>
                        </div>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
