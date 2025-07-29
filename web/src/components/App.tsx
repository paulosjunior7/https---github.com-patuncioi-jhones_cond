import React, { useState } from "react";
import { debugData } from "../utils/debugData";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { useVisibility } from "../providers/VisibilityProvider";
import type { Document, TabType } from "../types";
import MeusDocumentos from "./MeusDocumentos";
import CriarDocumento from "./CriarDocumento";
import AprovarDocumento from "./AprovarDocumento";
import GerenciarDocumentos from "./GerenciarDocumentos";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App: React.FC = () => {
  const { visible, setVisible } = useVisibility();
  const [activeTab, setActiveTab] = useState<TabType>("meus-documentos");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  // Mock data
  const [documents] = useState<Document[]>([
    {
      id: 1,
      name: "Bruno Tobias",
      type: "Empresarial",
      category: "Prestação de Serviço",
      identity: "DES Seiki7",
      issueDate: "02/02/2025",
      validDate: "02/02/2025",
      status: "Aprovado",
    },
    {
      id: 2,
      name: "Paulo Junior",
      type: "Pessoal",
      category: "Compra e Venda",
      identity: "DES Seiki7",
      issueDate: "01/01/2025",
      validDate: "01/01/2025",
      status: "Aprovado",
    },
    {
      id: 3,
      name: "Maria Clara",
      type: "Empresarial",
      category: "Prestação de Serviço",
      identity: "DES Seiki7",
      issueDate: "15/04/2025",
      validDate: "15/04/2025",
      status: "Pendente",
    },
  ]);

  const [pendingDocuments] = useState<Document[]>([
    {
      id: 434,
      name: "OAB ADVOGADO",
      type: "Empresarial",
      category: "Prestação de Serviço",
      identity: "DES Seiki7",
      issueDate: "02/03/2025",
      validDate: "12/05/2025",
      status: "Pendente",
    },
  ]);

  useNuiEvent<boolean>("setVisible", setVisible);

  const handleClose = () => {
    setVisible(false);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedDocument(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center ">
      <div className="bg-[#0E0E11] rounded-2xl w-full min-w-[880px] max-w-[900px] h-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "meus-documentos" && (
            <MeusDocumentos
              documents={documents}
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
              onClose={handleClose}
            />
          )}
          {activeTab === "criar-documento" && (
            <CriarDocumento onClose={handleClose} />
          )}
          {activeTab === "aprovar-documento" && (
            <AprovarDocumento
              pendingDocuments={pendingDocuments}
              onClose={handleClose}
            />
          )}
          {activeTab === "gerenciar-documentos" && <GerenciarDocumentos />}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-[#121215] h-[70px] border-[#242528] border-t flex items-center justify-center">
          <div className="flex justify-center">
            <div className="flex  p-1">
              <button
                onClick={() => handleTabChange("meus-documentos")}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === "meus-documentos"
                    ? "border-[#FF204E] border-t-2 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Meus documentos
              </button>
              <button
                onClick={() => handleTabChange("criar-documento")}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === "criar-documento"
                    ? "border-[#FF204E] border-t-2 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Criar documento
              </button>
              <button
                onClick={() => handleTabChange("aprovar-documento")}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === "aprovar-documento"
                    ? "border-[#FF204E] border-t-2 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Aprovar documento
              </button>
              <button
                onClick={() => handleTabChange("gerenciar-documentos")}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === "gerenciar-documentos"
                    ? "border-[#FF204E] border-t-2 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Gerenciar documentos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
