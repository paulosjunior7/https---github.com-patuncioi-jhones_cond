import React from 'react';
import {
  IconHome,
  IconUser,
  IconTaxas,
  IconGarage,
  IconClothes,
  IconUpgrades,
  IconEye,
  IconLocker,
  IconUnlocker,
  IconHuman
} from './index';

const IconExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Exemplos de Ícones</h1>
      
      {/* Ícones com cores diferentes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ícones com Cores Diferentes</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <IconHome size={32} color="#3B82F6" />
            <span className="text-sm mt-2">Azul</span>
          </div>
          <div className="flex flex-col items-center">
            <IconUser size={32} color="#EF4444" />
            <span className="text-sm mt-2">Vermelho</span>
          </div>
          <div className="flex flex-col items-center">
            <IconTaxas size={32} color="#10B981" />
            <span className="text-sm mt-2">Verde</span>
          </div>
          <div className="flex flex-col items-center">
            <IconGarage size={32} color="#F59E0B" />
            <span className="text-sm mt-2">Amarelo</span>
          </div>
          <div className="flex flex-col items-center">
            <IconClothes size={32} color="#8B5CF6" />
            <span className="text-sm mt-2">Roxo</span>
          </div>
        </div>
      </div>

      {/* Ícones com tamanhos diferentes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ícones com Tamanhos Diferentes</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col items-center">
            <IconUpgrades size={16} color="currentColor" />
            <span className="text-sm mt-2">16px</span>
          </div>
          <div className="flex flex-col items-center">
            <IconEye size={24} color="currentColor" />
            <span className="text-sm mt-2">24px</span>
          </div>
          <div className="flex flex-col items-center">
            <IconLocker size={32} color="currentColor" />
            <span className="text-sm mt-2">32px</span>
          </div>
          <div className="flex flex-col items-center">
            <IconUnlocker size={48} color="currentColor" />
            <span className="text-sm mt-2">48px</span>
          </div>
          <div className="flex flex-col items-center">
            <IconHuman size={64} color="currentColor" />
            <span className="text-sm mt-2">64px</span>
          </div>
        </div>
      </div>

      {/* Ícones com classes CSS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ícones com Classes CSS</h2>
        <div className="flex flex-wrap gap-4">
          <IconHome 
            size={32} 
            className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer" 
          />
          <IconUser 
            size={32} 
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" 
          />
          <IconTaxas 
            size={32} 
            className="text-green-500 hover:text-green-700 transition-colors cursor-pointer" 
          />
          <IconGarage 
            size={32} 
            className="text-yellow-500 hover:text-yellow-700 transition-colors cursor-pointer" 
          />
          <IconClothes 
            size={32} 
            className="text-purple-500 hover:text-purple-700 transition-colors cursor-pointer" 
          />
        </div>
      </div>

      {/* Exemplo de uso em botões */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ícones em Botões</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            <IconHome size={20} />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            <IconUser size={20} />
            <span>Perfil</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
            <IconTaxas size={20} />
            <span>Taxas</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
            <IconGarage size={20} />
            <span>Garagem</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconExample; 