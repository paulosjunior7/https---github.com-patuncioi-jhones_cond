import React, { useState } from "react";
import { debugData } from "./utils/debugData";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { useVisibility } from "./providers/VisibilityProvider";
import type { Document, TabType } from "./types";
import { Switch } from "@/components/ui/switch";
import { cn } from "./lib/utils";
import {
  Check,
  CornerLeftUp,
  Lock,
  Pencil,
  Plus,
  Search,
  User,
  UserX,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";

// This will set the NUI to visible if we are
// developing in browser

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const menus = [
  {
    key: "dashboard",
    icon: "/svgs/ic_round-home.svg",
    alt: "dashboard",
    size: "size-5",
    tab: "dashboard",
  },
  {
    key: "permissoes-usuarios",
    icon: "/svgs/ic_user.svg",
    alt: "Usuários",
    size: "size-5",
    tab: "permissoes-usuarios",
  },
  {
    key: "armario-virtual",
    icon: "/svgs/ic_clothes.svg",
    alt: "Armário",
    size: "size-6",
    tab: "armario-virtual",
  },
  {
    key: "upgrades",
    icon: "/svgs/ic_upgrades.svg",
    alt: "Upgrades",
    size: "size-6",
    tab: "upgrades",
  },
  {
    key: "cargarage",
    icon: "/svgs/ic_cargarage.svg",
    alt: "Garagem",
    size: "size-6",
    tab: "garagem",
  },
  {
    key: "taxas",
    icon: "/svgs/ic_taxas.svg",
    alt: "Taxas",
    size: "size-6 text-gray-200",
    tab: "taxas",
  },
];

const App: React.FC = () => {
  const { visible, setVisible } = useVisibility();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  useNuiEvent<boolean>("setVisible", setVisible);

  const handleClose = () => {
    setVisible(false);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
      <div className="modal-cut-corners bg-[#0F0F12] w-full max-w-[80%] h-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-8 pl-12">
          <div className="flex gap-6 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#FF204E] w-9 rounded-lg h-9 flex items-center justify-center">
                  <img src="/svgs/ic_round-home.svg" alt="Logo" />
                </div>
                <h2 className="font-bold text-2xl">
                  {activeTab === "dashboard"
                    ? "Home"
                    : activeTab === "permissoes-usuarios"
                    ? "Permissões de Usuários"
                    : activeTab === "armario-virtual"
                    ? "Armário Virtual"
                    : activeTab === "upgrades"
                    ? "Upgrades"
                    : activeTab === "garagem"
                    ? "Garagem"
                    : activeTab === "taxas"
                    ? "Taxas"
                    : ""}
                </h2>
              </div>
              <div className="flex items-start gap-3 flex-col justify-start">
                {/* Remover o label fixo */}
                {/* ...existing code... */}
                <div className="flex gap-2 mt-5 px-4 py-2  border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-[6px]">
                  {menus.map((menu) => (
                    <div
                      key={menu.key}
                      onClick={() =>
                        menu.tab && handleTabChange(menu.tab as TabType)
                      }
                      className={cn(
                        "w-8 h-8 rounded-[6px] flex items-center justify-center group relative cursor-pointer",
                        activeTab === menu.tab && "bg-[#FF204E]"
                      )}
                    >
                      <img
                        src={menu.icon}
                        alt={menu.alt}
                        className={cn(
                          menu.size,
                          activeTab === menu.tab
                            ? "text-white fill-white"
                            : "text-gray-400"
                        )}
                      />
                      {/* Tooltip customizado */}
                      <span
                        className={cn(
                          "pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-12 z-20 px-3 py-1 rounded-md bg-[#fff] text-[#171717] text-xs font-bold whitespace-nowrap shadow transition-opacity duration-200",
                          "opacity-0 group-hover:opacity-100"
                        )}
                      >
                        {menu.alt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "permissoes-usuarios" && <PermissoesUsuarios />}
          {activeTab === "armario-virtual" && <ArmarioVirtual />}
          {activeTab === "upgrades" && <Upgrades />}
          {activeTab === "garagem" && <Cargarage />}
          {activeTab === "taxas" && <Taxas />}
        </div>
      </div>
    </div>
  );

  function Dashboard() {
    const [switchDangerZone, setSwitchDangerZone] = useState(false);
    const [switchPortaEntrada, setSwitchPortaEntrada] = useState(false);
    const [switchPortaFundos, setSwitchPortaFundos] = useState(false);

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
                  Casa Branca Nivel 3
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-gray-400 text-sm">
                  Data de vencimento da taxa
                </p>
                <p className="text-white font-bold text-md">02/10/2025</p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  Total de usuários cadastrados
                </p>
                <p className="text-white font-bold">14 Membros</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Total de roupas salvas</p>
                <p className="text-white font-bold">34 Roupas</p>
              </div>
            </div>
            <div className="justify-end items-center flex">
              <div className="flex items-center gap-2 bg-[#242528] p-3 rounded-lg">
                <Switch
                  checked={switchDangerZone}
                  onCheckedChange={setSwitchDangerZone}
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
            <div className="h-[44px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full items-center p-2 ">
              <div className="flex items-center gap-2 w-full">
                <div
                  className={cn(
                    "bg-[#FF204E] h-[28px] w-[28px] rounded-lg mr-2 flex items-center justify-center",
                    switchPortaEntrada ? "bg-[#FF204E]" : "bg-[#28282b]"
                  )}
                >
                  <img
                    src="/svgs/ic_locker.svg"
                    alt="Lock Icon"
                    className="size-[13px]"
                  />
                </div>
                <div className="font-medium text-base">Entrada principal</div>
              </div>
              <div className="flex items-center justify-end w-full gap-2">
                <span className="text-gray-400 text-sm select-none">
                  {" "}
                  {switchPortaEntrada ? "Trancado" : "Destrancado"}
                </span>
                <Switch
                  checked={switchPortaEntrada}
                  onCheckedChange={setSwitchPortaEntrada}
                />
              </div>
            </div>
            <div className="h-[44px] border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-lg flex w-full items-center p-2 ">
              <div className="flex w-full items-center gap-2">
                <div
                  className={cn(
                    "bg-[#28282b] h-[28px] w-[28px] rounded-lg  mr-2 flex items-center justify-center",
                    switchPortaFundos ? "bg-[#FF204E]" : "bg-[#28282b]"
                  )}
                >
                  <img
                    src={
                      switchPortaFundos
                        ? "/svgs/ic_locker.svg"
                        : "/svgs/ic_unlocker.svg"
                    }
                    alt="Lock Icon"
                    className="size-[13px] text-[#525255]"
                  />
                </div>
                <div className="font-medium text-base select-none">
                  Porta dos fundos
                </div>
              </div>
              <div className="flex items-center justify-end w-full gap-2">
                <span className="text-gray-400 text-sm">
                  {switchPortaFundos ? "Trancado" : "Destrancado"}
                </span>
                <Switch
                  checked={switchPortaFundos}
                  onCheckedChange={setSwitchPortaFundos}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function PermissoesUsuarios() {
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
                    <DialogContent className="sm:max-w-[425px] p-10 modal-cut-corners">
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
                      <div className="grid gap-4 overflow-y-auto max-h-[300px]  ">
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
                                onClick={handleClose}
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

  function ArmarioVirtual() {
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

  function Upgrades() {
    return (
      <div className="flex gap-6 flex-col py-10">
        <div className="flex-row flex justify-between items-center">
          <p className="font-semibold text-lg">Upgrades disponíveis</p>
          <div className="bg-[#FF204E] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#FF204E] text-xs font-bold">$</span>
            </div>
            <span className="font-semibold">500</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="border relative border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 flex items-center justify-between"
            >
              <img
                src="/svgs/mdi_human.svg"
                alt="Upgrade"
                className="absolute left-0 top-0 size-[100px]"
              />
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                      index === 0
                        ? "bg-[#FF204E]"
                        : "bg-[#2c2c2f] border-[#525254] border-[2px] text-black"
                    )}
                  >
                    {index === 0 ? "3" : "1"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-white text-lg">Skinshop</h3>
                  <p className="text-gray-400 text-sm max-w-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#28282b] text-white px-3 py-1 rounded-md border-[#525254] border-[1px] flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FF204E] rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <span className="font-semibold">500</span>
                </div>

                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <button
                        className={cn(
                          "px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors",
                          index === 0
                            ? "bg-[#FF204E] text-white hover:opacity-90"
                            : "bg-[#2c2c2e] text-[#8b8b8c] hover:opacity-80"
                        )}
                      >
                        <CornerLeftUp className="size-4" />
                        <span className="text-sm">
                          {index === 0 ? "Fazer Upgrade" : "Fazer Upgrade"}
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-10 modal-cut-corners">
                      <DialogHeader className="flex gap-3">
                        <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                          <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                            <Check />
                          </div>
                          Confirmação de Upgrade
                        </DialogTitle>
                        <DialogDescription className="font-normal text-base">
                          Confirma a compra deste upgrade?
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <div className="flex flex-row w-full gap-2 sm:max-w-[425px] justify-between">
                          <div className="w-full">
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="h-[40px]  w-full font-semibold bg-[#28282b] text-white"
                                onClick={handleClose}
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
          {/* <div className="flex justify-center">
            <button className="bg-[#FF204E] w-10 h-10 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    );
  }

  function Cargarage() {
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
            <button className="bg-[#FF204E] hover:bg-[#FF204E]/80 w-auto font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
              Guardar veículo
            </button>
            <button className=" w-auto border-[#FFFFFF1A] border hover:bg-[#FFFFFF1A] font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
              Liberar veículo
            </button>
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

              <div className="flex items-center">
                <span
                  className={cn(
                    "text-md font-medium",
                    index === 0 ? "text-[#838385]" : "text-[#838385]/50"
                  )}
                >
                  {index === 0 ? "Veículo Guardado" : "Veículo Spawnado"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Taxas() {
    return (
      <div className="flex gap-6 flex-col py-5">
        <span className="text-white text-lg font-bold">
          Informações Financeiras
        </span>
        {/* Informações Financeiras */}
        <div className="border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 h-[80px] items-center">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <span className="text-white text-lg font-bold">
                  $ 50.342.454
                </span>
                <span className="bg-[#FFB1201A] text-[#FFB120] px-3 py-1 rounded-full text-xs font-semibold">
                  Pendente
                </span>
              </div>
              <span className="text-gray-400 text-sm">Valor da taxa</span>
            </div>
            <div className="flex items-center gap-4 h-[34px]">
              <button className="bg-[#FF204E] hover:bg-[#FF204E]/80 text-white  items-center px-6 py-1 rounded-lg font-semibold">
                Pagar agora
              </button>
            </div>
          </div>
        </div>

        {/* Próximo vencimento */}
        <div className="flex items-center justify-between border h-[46px] border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-[#FF204E] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-white font-semibold">
              Próximo vencimento:
            </span>
          </div>
          <span className="text-white text-sm font-semibold">02/05/2025</span>
        </div>

        {/* Histórico de pagamentos */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold text-lg">
              Históricos de pagamentos
            </h3>
            <div className="relative">
              <Search className="text-gray-400 size-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                className="bg-[#1e1e21] pl-10 border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-[270px] font-semibold"
                placeholder="Pesquisar"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-4">
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                className="border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 h-[46px] flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="bg-[#8CFF001A] text-[#8CFF00] px-3 py-1 rounded-md text-xs font-semibold">
                    Pago
                  </span>
                  <span className="text-white font-semibold">
                    Taxa de condomínio
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#28282b] text-gray-400 px-3 py-0.5 rounded-md items-center">
                    <span className="text-white font-semibold text-xs">
                      02/06/2025
                    </span>
                  </div>
                  <div className="bg-[#28282b] text-gray-400 px-3 py-0.5 rounded-md items-center">
                    <span className="font-semibold text-xs">$ 50.000</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default App;
