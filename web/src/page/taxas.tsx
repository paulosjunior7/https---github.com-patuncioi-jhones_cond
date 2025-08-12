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
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { fetchNui } from "@/utils/fetchNui";
import type { MockResponseContexto } from "./PainelContext";
import { useVisibility } from "@/providers/VisibilityProvider";

interface PaymentHistory {
  title: string;
  date: string;
  value: number;
}

interface ResidenceFinanceData {
  pendingPayment: number;
  nextPayment: string;
  nextPaymentValue: number;
  nextPaymentDate: string;
  paymentsHistory: PaymentHistory[];
  paymentsNextContext: MockResponseContexto | null;
  paymentTaxContext: MockResponseContexto | null;
}
interface Response {
  message: string;
  success: boolean;
}

export default function Taxas() {
  const [financeData, setFinanceData] = useState<ResidenceFinanceData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { isSmall, isMedium } = useResponsive();
  const { visibleContext, setVisibleContext } = useVisibility();

  const loadFinanceData = () => {
    setLoading(true);
    fetchNui("jhones_cond:getResidenceFinance")
      .then((data) => {
        const response = data as ResidenceFinanceData;
        console.log("Carregando dados financeiros:", JSON.stringify(response));
        setFinanceData(response);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados financeiros:", error);
        setFinanceData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePayment = async (type: "advance" | "regular") => {
    try {
      let response: Response;

      if (type === "advance") {
        // response = await fetchNui("jhones_cond:advancepayment", {
        //   value: financeData?.pendingPayment || 0,
        // });
        setVisibleContext(financeData?.paymentsNextContext || null);
      } else {
        // response = await fetchNui("jhones_cond:payResidence", {
        //   value: financeData?.pendingPayment || 0,
        // });
        setVisibleContext(financeData?.paymentTaxContext || null);
      }

      // if (true) {
      //   toast(
      //     <ToastMessage
      //       text={response.message}
      //       type={response.success ? "success" : "error"}
      //     />,
      //     {
      //       duration: 5000,
      //       style: {
      //         display: "none",
      //       },
      //     }
      //   );
      // }

      // if (response.success) {
      //   loadFinanceData();
      // }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
    }
  };

  useEffect(() => {
    loadFinanceData();
  }, []);

  return (
    <div className="flex gap-2 sm:gap-2 md:gap-6 flex-col py-5 h-full max-h-full overflow-hidden">
      <span
        className={`text-white font-semibold flex-shrink-0 ${
          isSmall ? "text-sm" : isMedium ? "text-base" : "text-lg"
        }`}
      >
        Informações Financeiras
      </span>

      {/* Informações Financeiras */}
      {loading ? (
        <div className="border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 h-[80px] flex items-center justify-center">
          <div className="text-white text-lg">
            Carregando dados financeiros...
          </div>
        </div>
      ) : financeData ? (
        <div className="border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 h-[80px] items-center flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <span
                  className={`text-white font-bold ${
                    isSmall ? "text-base" : "text-lg"
                  }`}
                >
                  $ {financeData.pendingPayment.toLocaleString()}
                </span>
                <span className="bg-[#FFB1201A] text-[#FFB120] px-3 py-1 rounded-full text-xs font-semibold">
                  Pendente
                </span>
              </div>
              <span className="text-gray-400 text-sm">Valor da taxa</span>
            </div>
            <div className="flex items-center gap-4 h-[34px]">
              <button
                onClick={() => handlePayment("advance")}
                className={`border-[#FFFFFF1A] border hover:bg-[#FFFFFF1A] font-semibold flex items-center text-white rounded-lg ${
                  isSmall
                    ? "px-3 py-2 h-[35px] text-xs"
                    : "px-4 py-2 h-[38px] text-sm"
                }`}
              >
                Adiantar pagamento
              </button>

              <button
                onClick={() => handlePayment("regular")}
                className={`bg-[#FF204E] hover:bg-[#FF204E]/80 text-white items-center rounded-lg font-semibold ${
                  isSmall ? "px-4 py-2 h-[35px] text-xs" : "px-6 py-1 text-sm"
                }`}
              >
                Pagar taxa
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 h-[80px] flex items-center justify-center">
          <div className="text-gray-400 text-lg">
            Erro ao carregar dados financeiros
          </div>
        </div>
      )}

      {/* Próximo vencimento */}
      {financeData && (
        <div className="flex items-center justify-between border h-[46px] border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 flex-shrink-0">
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
            <span
              className={`text-white font-semibold ${
                isSmall ? "text-sm" : "text-base"
              }`}
            >
              Próximo vencimento:
            </span>
          </div>
          <span
            className={`text-white font-semibold ${
              isSmall ? "text-xs" : "text-sm"
            }`}
          >
            {financeData.nextPaymentDate}
          </span>
        </div>
      )}

      {/* Histórico de pagamentos */}
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
        <div className="flex justify-between items-center flex-shrink-0">
          <h3
            className={`text-white font-semibold ${
              isSmall ? "text-sm" : isMedium ? "text-base" : "text-lg"
            }`}
          >
            Históricos de pagamentos
          </h3>
        </div>

        <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-4 min-h-0 h-[180px] sm:max-h-[280px] md:max-h-[350px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-lg">Carregando histórico...</div>
            </div>
          ) : financeData && financeData.paymentsHistory.length > 0 ? (
            financeData.paymentsHistory.map((payment, index) => (
              <div
                key={index}
                className={`border border-[#FFFFFF1A] bg-[#1e1e21] rounded-lg p-4 h-[46px] flex items-center justify-between ${
                  isSmall ? "flex-col gap-2 h-auto py-3" : "flex-row"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="bg-[#8CFF001A] text-[#8CFF00] px-3 py-1 rounded-md text-xs font-semibold">
                    Pago
                  </span>
                  <span
                    className={`text-white font-semibold ${
                      isSmall ? "text-sm" : "text-base"
                    }`}
                  >
                    {payment.title}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-4 ${
                    isSmall ? "flex-col gap-2" : "flex-row"
                  }`}
                >
                  <div className="bg-[#28282b] text-gray-400 px-3 py-0.5 rounded-md items-center">
                    <span
                      className={`text-white font-semibold ${
                        isSmall ? "text-xs" : "text-xs"
                      }`}
                    >
                      {payment.date}
                    </span>
                  </div>
                  <div className="bg-[#28282b] text-gray-400 px-3 py-0.5 rounded-md items-center">
                    <span
                      className={`font-semibold ${
                        isSmall ? "text-xs" : "text-xs"
                      }`}
                    >
                      $ {payment.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400 text-lg">
                Nenhum pagamento encontrado no histórico
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
