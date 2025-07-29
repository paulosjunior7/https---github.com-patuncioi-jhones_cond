import React from "react";
import type { Document } from "../types";

interface MeusDocumentosProps {
  documents: Document[];
  selectedDocument: Document | null;
  setSelectedDocument: (doc: Document | null) => void;
  onClose: () => void;
}

const MeusDocumentos: React.FC<MeusDocumentosProps> = ({
  documents,
  selectedDocument,
  setSelectedDocument,
  onClose,
}) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[# rounded-lg flex items-center justify-center">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Meu documento</h2>
            <p className="text-gray-400 text-sm font-normal w-[428px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {selectedDocument ? (
        <div className="bg-[#121215] rounded-lg p-6 relative h-[160px] overflow-hidden">
          <div className=" rounded-lg    overflow-hidden">
            <div className="flex items-start gap-6">
              <div className="absolute left-0 top-0 bottom-0 w-36 z-0 pointer-events-none" />
              <img
                src="./assets/brasao.svg"
                alt="Brasão"
                className="absolute left-0 object-contain top-0 bottom-0 z-10 drop-shadow-2xl filter brightness-110 contrast-110"
              />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-6 absolute left-44">
              <div>
                <p className="text-gray-400 text-sm">Nome</p>
                <p className="text-white font-semibold">
                  {selectedDocument.name}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Tipo de documento</p>
                <p className="text-white font-semibold">
                  {selectedDocument.type}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Categoria</p>
                <p className="text-white font-semibold">
                  {selectedDocument.category}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Identidade</p>
                <p className="text-white font-semibold">
                  {selectedDocument.identity}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Data de emissão</p>
                <p className="text-white font-semibold">
                  {selectedDocument.issueDate}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Data de validade</p>
                <p className="text-white font-semibold">
                  {selectedDocument.validDate}
                </p>
              </div>
            </div>
            <div className="flex items-end gap-4 flex-col justify-end">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedDocument.status === "Pendente"
                    ? "bg-[#1b1f1a] hover:bg-yellow-600 text-[#f29d00]"
                    : "bg-[#1b1f1a] text-[#85f201]"
                }`}
              >
                {selectedDocument.status}
              </span>
              <div className="border-[#1f1f21] border-[2px] size-9 flex items-center justify-center rounded-lg">
                <span className="text-base font-bold text-gray-600">
                  {selectedDocument.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#161719] overflow-hidden border-[#1f1f21] border-[2px] rounded-lg p-4 h-[160px] relative flex items-center justify-between cursor-pointer transition-colors hover:opacity-80"
              onClick={() => setSelectedDocument(doc)}
            >
              <div className=" rounded-lg    overflow-hidden">
                <div className="flex items-start gap-6">
                  <div className="absolute left-0 top-0 bottom-0 w-36 z-0 pointer-events-none" />
                  <img
                    src="./assets/brasao.svg"
                    alt="Brasão"
                    className="absolute left-0 object-contain top-0 bottom-0 z-10 drop-shadow-2xl filter brightness-110 contrast-110"
                  />
                </div>
                <div className="grid grid-cols-3 pl-36 gap-4 p-1">
                  <div>
                    <p className="text-gray-400 text-sm">Nome</p>
                    <p className="text-white font-semibold">{doc.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Tipo de documento</p>
                    <p className="text-white font-semibold">{doc.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Categoria</p>
                    <p className="text-white font-semibold">{doc.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Identidade</p>
                    <p className="text-white font-semibold">
                      {doc.identity}{" "}
                      <span className="text-gray-500 ml-1 text-[12px] border-[#1f1f21] border-[2px] rounded-lg px-2 p-1">
                        #{doc.id}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Data de emissão</p>
                    <p className="text-white font-semibold">{doc.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Data de validade</p>
                    <p className="text-white font-semibold">{doc.validDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-4 flex-col justify-end">
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    doc.status === "Pendente"
                      ? "bg-[#1b1f1a] hover:bg-yellow-600 text-[#f29d00]"
                      : "bg-[#1b1f1a] text-[#85f201]"
                  }`}
                >
                  {doc.status}
                </span>
                <div className="border-[#1f1f21] border-[2px] size-9 flex items-center justify-center rounded-lg">
                  <span className="text-base font-bold text-gray-600">
                    {doc.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeusDocumentos;
