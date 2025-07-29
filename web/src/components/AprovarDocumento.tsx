import React, { useState } from "react";
import type { Document } from "../types";

interface AprovarDocumentoProps {
  pendingDocuments: Document[];
  onClose: () => void;
}

const AprovarDocumento: React.FC<AprovarDocumentoProps> = ({
  pendingDocuments,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Aprovar documento</h2>
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

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Digite o passaporte do indivíduo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-12 py-4 bg-[#121215] border border-[#242528] text-sm font-normal rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {pendingDocuments.map((doc) => (
          <div key={doc.id} className="">
            <div className="flex items-center justify-between mb-6 border-[#242528] border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 h-[34px] bg-[#FF204E] text-white rounded-lg font-semibold leading-none">
                  {doc.name}
                </span>
                <div className="grid grid-cols-3 gap-8 text-sm">
                  <div>
                    <span className="text-gray-400">Validade</span>
                    <div className="text-white font-semibold">
                      {doc.validDate}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Publicado</span>
                    <div className="text-white font-semibold">
                      {doc.issueDate}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">ID</span>
                    <div className="text-white font-semibold">{doc.id}</div>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#201b19] hover:bg-yellow-600 text-[#f29d00] rounded-lg font-medium transition-colors">
                Análise
              </button>
            </div>

            <div className="flex items-center justify-between mb-6 border-[#242528] border p-4 rounded-lg">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Abrir documento
              </button>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 font-semibold bg-[#FF204E] hover:bg-red-600 text-white rounded-lg transition-colors">
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
                  Aprovar documento
                </button>

                <button className="flex items-center gap-2 px-6 py-3 bg-gray-600 font-semibold hover:bg-gray-700 text-white rounded-lg transition-colors">
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
                  Reprovar documento
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AprovarDocumento;
