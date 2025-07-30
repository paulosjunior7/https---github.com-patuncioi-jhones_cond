import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  message?: string;
  show?: boolean;
  variant?: "default" | "pulse" | "spinner" | "dots";
}

const Loader: React.FC<LoaderProps> = ({
  message = "Carregando...",
  show = true,
  variant = "default",
}) => {
  if (!show) return null;

  const renderLoader = () => {
    switch (variant) {
      case "pulse":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-[#FF204E] rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-16 h-16 bg-[#FF204E] rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-white text-lg font-semibold animate-pulse">
              {message}
            </div>
          </div>
        );

      case "spinner":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#1e1e21] border-t-[#FF204E] rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1e1e21] rounded-full"></div>
            </div>
            <div className="text-white text-lg font-semibold">{message}</div>
          </div>
        );

      case "dots":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#FF204E] rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-[#FF204E] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-[#FF204E] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="text-white text-lg font-semibold">{message}</div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Logo/Ícone animado */}
            <div className="relative">
              <Loader2 className="size-32 text-[#FF204E] animate-spin" />

              {/* Anéis orbitais */}
            </div>

            {/* Texto de carregamento */}
            <div className="text-center">
              <div className="text-white text-xl font-bold mb-2">{message}</div>
            </div>

            {/* CSS para animação infinita */}
            <style>
              {`
                @keyframes loader-infinite-bar {
                  0% {
                    transform: translateX(-150%);
                  }
                  100% {
                    transform: translateX(250%);
                  }
                }
              `}
            </style>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Background com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e11] via-[#1a1a1f] to-[#0e0e11] opacity-90"></div>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FF204E] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10">{renderLoader()}</div>

      {/* Overlay de brilho */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-pulse"></div>
    </div>
  );
};

export default Loader;
