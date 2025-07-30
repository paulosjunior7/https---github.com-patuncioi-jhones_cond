import { ToastMessage } from "@/components/ToastMessage";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Taxas() {
  const handleSuccessToast = () => {
    toast(
      <ToastMessage text="Pagamento realizado com sucesso!" type="error" />,
      {
        style: {
          display: "none",
        },
      }
    );
  };

  const handleErrorToast = () => {
    toast(<ToastMessage text="Erro ao processar pagamento!" type="error" />, {
      style: {
        display: "none",
      },
    });
    <ToastMessage text="Erro ao processar pagamento!" type="error" />;
  };

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
              <span className="text-white text-lg font-bold">$ 50.342.454</span>
              <span className="bg-[#FFB1201A] text-[#FFB120] px-3 py-1 rounded-full text-xs font-semibold">
                Pendente
              </span>
            </div>
            <span className="text-gray-400 text-sm">Valor da taxa</span>
          </div>
          <div className="flex items-center gap-4 h-[34px]">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <button className=" w-auto border-[#FFFFFF1A] border hover:bg-[#FFFFFF1A] font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
                    Adiantar pagamento
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-10 modal-cut-corners">
                  <DialogHeader className="flex gap-3">
                    <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                      <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                        <Check />
                      </div>
                      Confirmação o adiantamento
                    </DialogTitle>
                    <DialogDescription className="font-normal text-base py-5">
                      Confirma o <span className="font-bold">adiantamento</span>{" "}
                      do pagamento da taxa de condomínio no valor de $
                      50.342.454?
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

            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <button className="bg-[#FF204E] hover:bg-[#FF204E]/80 text-white  items-center px-6 py-1 rounded-lg font-semibold text-sm">
                    Pagar taxa
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-10 modal-cut-corners">
                  <DialogHeader className="flex gap-3">
                    <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                      <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                        <Check />
                      </div>
                      Confirmação de pagamento
                    </DialogTitle>
                    <DialogDescription className="font-normal text-base py-5">
                      Confirma o <span className="font-bold">pagamento</span> da
                      taxa de condomínio no valor de $ 50.342.454?
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
                          onClick={() => {
                            handleSuccessToast();
                          }}
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
          <span className="text-white font-semibold">Próximo vencimento:</span>
        </div>
        <span className="text-white text-sm font-semibold">02/05/2025</span>
      </div>

      {/* Histórico de pagamentos */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold text-lg">
            Históricos de pagamentos
          </h3>
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
