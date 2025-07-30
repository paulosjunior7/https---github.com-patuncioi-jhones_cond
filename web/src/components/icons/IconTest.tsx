import React, { useState } from 'react';
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

const IconTest: React.FC = () => {
  const [currentColor, setCurrentColor] = useState('#FF0000');
  const [currentSize, setCurrentSize] = useState(32);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'];
  const sizes = [16, 24, 32, 48, 64];

  return (
    <div className="p-8 space-y-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Teste dos Ícones</h1>
      
      {/* Controles */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Cor Atual: {currentColor}</h2>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setCurrentColor(color)}
                className="w-8 h-8 rounded border-2 border-white"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Tamanho Atual: {currentSize}px</h2>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setCurrentSize(size)}
                className={`px-3 py-1 rounded ${
                  currentSize === size ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Teste dos Ícones */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconHome size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconHome</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconUser size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconUser</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconTaxas size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconTaxas</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconGarage size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconGarage</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconClothes size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconClothes</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconUpgrades size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconUpgrades</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconEye size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconEye</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconLocker size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconLocker</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconUnlocker size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconUnlocker</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <IconHuman size={currentSize} color={currentColor} />
          <span className="text-white text-sm mt-2">IconHuman</span>
        </div>
      </div>

      {/* Teste de Cores Específicas */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Teste de Cores Específicas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <IconHome size={32} color="red" />
            <span className="text-white text-sm mt-2">Vermelho</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <IconUser size={32} color="green" />
            <span className="text-white text-sm mt-2">Verde</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <IconTaxas size={32} color="blue" />
            <span className="text-white text-sm mt-2">Azul</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <IconGarage size={32} color="yellow" />
            <span className="text-white text-sm mt-2">Amarelo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconTest; 