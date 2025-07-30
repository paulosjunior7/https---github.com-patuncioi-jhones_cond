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
import { Check, CornerLeftUp } from "lucide-react";
import { IconHuman } from "@/components/icons";

export default function Upgrades() {
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
            <IconHuman
              size={100}
              color="rgba(255, 255, 255, 0.06)"
              className="absolute left-0 top-0"
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
