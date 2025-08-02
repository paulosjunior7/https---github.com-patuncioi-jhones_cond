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
import { cn } from "@/lib/utils";
import { Check, Lock, Star, TrendingUp } from "lucide-react";
import { IconHuman } from "@/components/icons";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { fetchNui } from "@/utils/fetchNui";
import { ToastMessage } from "@/components/ToastMessage";
import { toast } from "sonner";

interface UpgradeData {
  id: string; // Adicionar o identificador do upgrade
  name: string;
  upgradeMessage: string;
  activeLevel: number;
  hasUpgrade: boolean;
  price: number;
  isLevelUpgrade: boolean;
  canUpgradeLevel: boolean; // Adicionar o campo canUpgradeLevel
}

interface UpgradesResponse {
  upgrades: {
    skinshop: UpgradeData;
    barbershop: UpgradeData;
    tattoos: UpgradeData;
    residenceOutFit: UpgradeData;
    chest: UpgradeData;
  };
}

interface Response {
  message: string;
  success: boolean;
}

export default function Upgrades() {
  const [upgrades, setUpgrades] = useState<UpgradeData[]>([]);
  const [playerMoney] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { isSmall, isMedium } = useResponsive();

  const getButtonText = (upgrade: UpgradeData) => {
    if (!upgrade.hasUpgrade) {
      // Ainda não desbloqueou
      return "Desbloquear";
    } else if (upgrade.hasUpgrade && upgrade.canUpgradeLevel) {
      // Desbloqueado e pode upar nível
      return "Fazer Upgrade";
    } else {
      // Desbloqueado mas não pode mais upar
      return "Máximo Atingido";
    }
  };

  const getButtonIcon = (upgrade: UpgradeData) => {
    if (!upgrade.hasUpgrade) {
      // Ainda não desbloqueou
      return <Lock className="size-4" />;
    } else if (upgrade.hasUpgrade && upgrade.canUpgradeLevel) {
      // Desbloqueado e pode upar nível
      return <TrendingUp className="size-4" />;
    } else {
      // Desbloqueado mas não pode mais upar
      return <Star className="size-4" />;
    }
  };

  const getCircleColor = (upgrade: UpgradeData) => {
    if (!upgrade.hasUpgrade) {
      // Não desbloqueado - Vermelho padrão
      return "bg-[#FF204E]";
    } else if (upgrade.hasUpgrade && upgrade.canUpgradeLevel) {
      // Pode fazer upgrade - Vermelho mais claro
      return "bg-[#FF4569]";
    } else {
      // Máximo atingido - Dourado
      return "bg-[#DAA520]";
    }
  };

  const getButtonColor = (upgrade: UpgradeData) => {
    if (!upgrade.hasUpgrade) {
      // Não desbloqueado - Vermelho padrão
      return "bg-[#FF204E] text-white hover:bg-[#E01B44]";
    } else if (upgrade.hasUpgrade && upgrade.canUpgradeLevel) {
      // Pode fazer upgrade - Vermelho mais claro
      return "bg-[#FF4569] text-white hover:bg-[#FF204E]";
    } else {
      // Máximo atingido - Dourado
      return "bg-[#DAA520] text-white hover:bg-[#B8860B]";
    }
  };

  const getLevelTextColor = (upgrade: UpgradeData) => {
    if (!upgrade.hasUpgrade) {
      // Não desbloqueado - Texto branco
      return "text-white";
    } else if (upgrade.hasUpgrade && upgrade.canUpgradeLevel) {
      // Pode fazer upgrade - Texto branco
      return "text-white";
    } else {
      // Máximo atingido - Texto escuro para contraste com dourado
      return "text-black";
    }
  };

  const loadUpgrades = () => {
    setLoading(true);
    fetchNui("jhones_cond:getUpgrades")
      .then((data) => {
        const response = data as UpgradesResponse;

        // Converter o objeto de upgrades em um array e adicionar o ID
        const upgradesArray: UpgradeData[] = Object.entries(response.upgrades)
          .filter(
            ([, upgrade]) => typeof upgrade === "object" && upgrade !== null
          )
          .map(([key, upgrade]) => ({
            ...(upgrade as UpgradeData),
            id: key, // Adicionar a chave como ID
          }));

        setUpgrades(upgradesArray);
      })
      .catch((error) => {
        console.error("Erro ao carregar upgrades:", error);
        setUpgrades([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePurchaseUpgrade = async (upgrade: UpgradeData) => {
    try {
      console.log("Enviando ID do upgrade:", upgrade.id);
      const response: Response = await fetchNui("jhones_cond:upgrade", {
        identifier: upgrade.id,
      });
      console.log("Enviando ID do upgrade:", JSON.stringify(upgrade.id));

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
      if (response) {
        loadUpgrades();
      }
    } catch (error) {
      console.error("Erro ao comprar upgrade:", error);
    }
  };

  useEffect(() => {
    loadUpgrades();
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
          Upgrades disponíveis
        </p>
        <div
          className={`bg-[#FF204E] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${
            isSmall ? "text-xs" : ""
          }`}
        >
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#FF204E] text-xs font-bold">$</span>
          </div>
          <span className="font-semibold text-xs md:text-base">
            {playerMoney}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-4 pb-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">Carregando upgrades...</div>
          </div>
        ) : upgrades.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-lg">
              Nenhum upgrade disponível
            </div>
          </div>
        ) : (
          upgrades.map((upgrade, index) => (
            <div
              key={index}
              className={`border relative overflow-hidden border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 flex items-center justify-between ${
                isSmall ? "flex-col gap-4" : "flex-row"
              }`}
            >
              <IconHuman
                size={100}
                color="rgba(255, 255, 255, 0.06)"
                className="absolute left-0 top-0"
              />
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                      // Usar cores dinâmicas baseadas no estado
                      !upgrade.hasUpgrade ||
                        (upgrade.hasUpgrade && upgrade.canUpgradeLevel)
                        ? getCircleColor(upgrade)
                        : "bg-[#2c2c2f] border-[#525254] border-[2px]",
                      // Cor do texto baseada no estado
                      !upgrade.hasUpgrade ||
                        (upgrade.hasUpgrade && upgrade.canUpgradeLevel)
                        ? getLevelTextColor(upgrade)
                        : "text-black"
                    )}
                  >
                    {upgrade.activeLevel}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3
                    className={`font-bold text-white ${
                      isSmall ? "text-base" : "text-lg"
                    }`}
                  >
                    {upgrade.name}
                  </h3>
                  <p
                    className={`text-gray-400 max-w-md md:max-w-2xl ${
                      isSmall ? "text-xs" : "text-sm sm:text-sm md:max-w-xs"
                    }`}
                  >
                    {upgrade.upgradeMessage}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 ${
                  isSmall ? "w-full justify-between" : ""
                }`}
              >
                <div
                  className={`bg-[#28282b] text-white px-3 py-1 rounded-md border-[#525254] border-[1px] flex items-center gap-2 ${
                    isSmall ? "flex-shrink-0" : ""
                  }`}
                >
                  <div className="w-4 h-4 bg-[#FF204E] rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <span
                    className={`font-semibold ${
                      isSmall ? "text-sm" : "text-sm sm:text-sm md:text-lg"
                    }`}
                  >
                    {upgrade.price}
                  </span>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className={cn(
                        "px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors",
                        // Usar cores dinâmicas baseadas no estado
                        !upgrade.hasUpgrade ||
                          (upgrade.hasUpgrade && upgrade.canUpgradeLevel)
                          ? getButtonColor(upgrade)
                          : "bg-[#2c2c2e] text-[#8b8b8c] hover:opacity-80"
                      )}
                      // Desabilitado quando não pode comprar
                      disabled={upgrade.hasUpgrade && !upgrade.canUpgradeLevel}
                    >
                      {getButtonIcon(upgrade)}
                      <span className="text-xs sm:text-xs md:text-base">
                        {getButtonText(upgrade)}
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    className={`p-10  ${
                      isSmall ? "sm:max-w-[250px]" : "sm:max-w-[425px]"
                    }`}
                  >
                    <DialogHeader className="flex gap-3">
                      <DialogTitle
                        className={`font-bold flex gap-3 leading-baseline ${
                          isSmall ? "text-lg" : "text-xl"
                        }`}
                      >
                        <div
                          className={`bg-[#FF204E] rounded-lg flex items-center justify-center ${
                            isSmall ? "size-6" : "size-8"
                          }`}
                        >
                          <Check className={isSmall ? "size-4" : "size-5"} />
                        </div>
                        Confirmação de Upgrade
                      </DialogTitle>
                      <DialogDescription
                        className={`font-normal ${
                          isSmall ? "text-sm" : "text-base"
                        }`}
                      >
                        Confirma a compra de <strong>{upgrade.name}</strong> por{" "}
                        <strong>${upgrade.price}</strong>?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <div
                        className={`flex w-full gap-2 justify-between ${
                          isSmall
                            ? "flex-col sm:max-w-[350px]"
                            : "flex-row sm:max-w-[425px]"
                        }`}
                      >
                        <div className="w-full">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className={`w-full font-semibold bg-[#28282b] text-white ${
                                isSmall
                                  ? "h-[35px] text-xs"
                                  : "h-[40px] text-sm"
                              }`}
                              onClick={() => {}}
                            >
                              Cancelar
                            </Button>
                          </DialogClose>
                        </div>
                        <div className="w-full">
                          <DialogClose asChild>
                            <Button
                              type="button"
                              className={`w-full font-semibold bg-[#FF204E] ${
                                isSmall
                                  ? "h-[35px] text-xs"
                                  : "h-[40px] text-sm"
                              }`}
                              onClick={() => handlePurchaseUpgrade(upgrade)}
                            >
                              Confirmar
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
