import React from "react";
import { useFormManager } from "../hooks/useFormManager";

interface CriarDocumentoProps {
  onClose: () => void;
}

const CriarDocumento: React.FC<CriarDocumentoProps> = ({ onClose }) => {
  const {
    formData,
    formErrors,
    isSubmitting,
    submitMessage,
    handleInputChange,
    handleSubmitDocument,
  } = useFormManager();

  return (
    <>
      <div className="flex flex-col relative p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF204E] rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Criar um documento
              </h2>
              <p className="text-gray-400 text-sm font-normal w-[428px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-[#FFFFFFCC] hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
          >
            <svg
              className="w-6 h-6 text-[#FFFFFFCC]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div
          className={`mx-6 mb-4 p-4 rounded-lg text-center ${
            submitMessage.type === "success"
              ? "bg-green-900/20 border border-green-500/30 text-green-400"
              : "bg-red-900/20 border border-red-500/30 text-red-400"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {submitMessage.type === "success" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span className="text-sm font-medium">{submitMessage.message}</span>
          </div>
        </div>
      )}

      <div className="flex w-full justify-center items-center mt-10">
        <div className="grid w-full grid-cols-2 gap-8 p-6 min-h-[280px] relative bg-[#151619]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-xs font-medium mb-2">
                  Passaporte do civil <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Digite o ID"
                  value={formData.passportId}
                  onChange={(e) =>
                    handleInputChange("passportId", e.target.value)
                  }
                  className={`w-full px-4 py-1 h-[36px] bg-[#1b1b1f] border text-xs font-normal rounded-lg text-white placeholder-gray-400 focus:outline-none ${
                    formErrors.passportId
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#242528] focus:border-red-500"
                  }`}
                />
                {formErrors.passportId && (
                  <p className="text-red-400 text-xs mt-1">
                    {formErrors.passportId}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-white text-xs font-medium mb-2">
                  Validade <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.validity}
                  onChange={(e) =>
                    handleInputChange("validity", e.target.value)
                  }
                  className={`w-full px-4 py-1 h-[36px] text-xs bg-[#1b1b1f] border font-normal rounded-lg text-white focus:outline-none ${
                    formErrors.validity
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#242528] focus:border-red-500"
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="30">30 dias</option>
                  <option value="60">60 dias</option>
                  <option value="90">90 dias</option>
                </select>
                {formErrors.validity && (
                  <p className="text-red-400 text-xs mt-1">
                    {formErrors.validity}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-xs font-medium mb-2">
                  Tipo de Documento <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-1 h-[36px] text-xs bg-[#1b1b1f] border font-normal rounded-lg text-white focus:outline-none ${
                    formErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#242528] focus:border-red-500"
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="empresarial">Empresarial</option>
                  <option value="pessoal">Pessoal</option>
                </select>
                {formErrors.name && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-xs font-medium mb-2">
                  Valor <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="$0"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  className={`w-full px-4 py-3 h-[36px] border text-sm font-normal rounded-lg text-white placeholder-gray-400 focus:outline-none ${
                    formErrors.value
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#242528] focus:border-red-500"
                  }`}
                  style={{ backgroundColor: "#1b1b1f" }}
                />
                {formErrors.value && (
                  <p className="text-red-400 text-xs mt-1">
                    {formErrors.value}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-xs font-medium mb-2">
                  Categoria <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className={`w-full px-4 py-1 h-[36px] text-xs bg-[#1b1b1f] border font-normal rounded-lg text-white focus:outline-none ${
                    formErrors.type
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#242528] focus:border-red-500"
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="prestacao-servico">
                    Prestação de Serviço
                  </option>
                  <option value="compra-venda">Compra e Venda</option>
                </select>
                {formErrors.type && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.type}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-xs font-medium mb-2">
                  Assinatura <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Digite sua assinatura"
                    value={formData.signature}
                    onChange={(e) =>
                      handleInputChange("signature", e.target.value)
                    }
                    className={`flex-1 px-4 py-3 h-[36px] border text-sm font-normal rounded-lg text-white focus:outline-none placeholder-gray-400 ${
                      formErrors.signature
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#242528] focus:border-red-500"
                    }`}
                    style={{ backgroundColor: "#1b1b1f" }}
                  />
                </div>
                {formErrors.signature && (
                  <p className="text-red-400 text-xs mt-1">
                    {formErrors.signature}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleSubmitDocument}
              disabled={isSubmitting}
              className={`absolute text-sm -top-12 right-4 w-[180px] px-6 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#FF204E] hover:bg-[#FF204E]/80"
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </div>
              ) : (
                "Enviar P/Análise"
              )}
            </button>
          </div>

          <div className="rounded-lg px-6">
            <h3 className="text-white text-xs font-semibold mb-4">Documento</h3>
            <div className="space-y-0 border border-[#242528] rounded-lg p-4 bg-[#1b1b1f]">
              <div>
                <span className="text-gray-400 text-xs">Nome:</span>
                <span className="text-white ml-2 text-xs">Desconhecido</span>
              </div>
              <div>
                <span className="text-gray-400 text-xs">Idade:</span>
                <span className="text-white ml-2 text-xs">Desconhecido</span>
              </div>
              <div>
                <span className="text-gray-400 text-xs">RG:</span>
                <span className="text-white ml-2 text-xs">Desconhecido</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-white text-xs font-medium mb-2">
                Nota Documento
              </h4>
              <div
                className="rounded-lg p-4 min-h-[80px] border border-[#242528]"
                style={{ backgroundColor: "#1b1b1f" }}
              >
                <span className="text-gray-400 text-xs">Desconhecido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriarDocumento;
