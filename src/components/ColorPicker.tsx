import React, { useState } from 'react';
import { Palette, Layout, PaintBucket, Eraser, RotateCcw } from 'lucide-react';
import { FLOOR_TEMPLATES, TILE_COLORS } from '../constants';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string | null) => void;
  onSelectTemplate: (template: typeof FLOOR_TEMPLATES[0]) => void;
  isErasing: boolean;
}

export default function ColorPicker({ selectedColor, onColorSelect, onSelectTemplate, isErasing }: ColorPickerProps) {
  const [mode, setMode] = useState<'palette' | 'template'>('palette');
  const [selectedTemplate, setSelectedTemplate] = useState(FLOOR_TEMPLATES[0]);
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#DB2921');

  const handleReset = () => {
    const defaultTemplate = {
      ...FLOOR_TEMPLATES[0],
      getTileColor: () => '#000000'
    };
    setMode('palette');
    setPrimaryColor('#000000');
    setSecondaryColor('#DB2921');
    setSelectedTemplate(FLOOR_TEMPLATES[0]);
    onSelectTemplate(defaultTemplate);
  };

  const handleApplyTemplate = () => {
    const customTemplate = {
      ...selectedTemplate,
      getTileColor: (x: number, y: number, width: number, length: number) => {
        const tilesWide = Math.ceil((width * 12) / 15.7);
        const tilesLong = Math.ceil((length * 12) / 15.75);
        
        switch (selectedTemplate.id) {
          case 'solid':
            return primaryColor;
          case 'border':
            return (x === 0 || y === 0 || x === tilesWide - 1 || y === tilesLong - 1) 
              ? primaryColor : secondaryColor;
          case 'inner-border':
            // Primary color for outermost border
            if (x === 0 || y === 0 || x === tilesWide - 1 || y === tilesLong - 1) {
              return primaryColor;
            }
            // Secondary color for inner border
            if (x === 1 || y === 1 || x === tilesWide - 2 || y === tilesLong - 2) {
              return secondaryColor;
            }
            // Primary color for interior
            return primaryColor;
          case 'double-border':
            // Primary color for outermost border
            if (x === 0 || y === 0 || x === tilesWide - 1 || y === tilesLong - 1) {
              return primaryColor;
            }
            // Secondary color for inner border
            if (x === 1 || y === 1 || x === tilesWide - 2 || y === tilesLong - 2) {
              return secondaryColor;
            }
            // Primary color for interior
            return primaryColor;
          case 'checkerboard':
            return (x + y) % 2 === 0 ? primaryColor : secondaryColor;
          default:
            return primaryColor;
        }
      }
    };
    onSelectTemplate(customTemplate);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-[calc(60vh-88px)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('palette')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'palette' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Palette className="w-4 h-4" />
            Colors
          </button>
          <button
            onClick={() => setMode('template')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'template'
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Layout className="w-4 h-4" />
            Templates
          </button>
        </div>
      </div>

      {mode === 'palette' ? (
        <>
          <div className="grid grid-cols-4 gap-1">
            {TILE_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorSelect(color.hex)}
                className={`aspect-square rounded-md border transition-all ${
                  selectedColor === color.hex ? 'border-blue-500 scale-105' : 'border-gray-200 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => onColorSelect(null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${
                isErasing ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
              title="Eraser"
            >
              <Eraser className={`w-4 h-4 ${isErasing ? 'text-blue-500' : 'text-gray-500'}`} />
              <span className="text-sm">Eraser</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Reset</span>
            </button>
            <span className="text-sm text-gray-600 ml-auto">
              {isErasing ? 'Eraser' : TILE_COLORS.find(c => c.hex === selectedColor)?.name}
            </span>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template Style</label>
            <select
              value={selectedTemplate.id}
              onChange={(e) => setSelectedTemplate(FLOOR_TEMPLATES.find(t => t.id === e.target.value) || FLOOR_TEMPLATES[0])}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {FLOOR_TEMPLATES.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} - {template.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <select
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {TILE_COLORS.map((color) => (
                <option key={color.id} value={color.hex}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          {selectedTemplate.id !== 'solid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
              <select
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {TILE_COLORS.map((color) => (
                  <option key={color.id} value={color.hex}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleApplyTemplate}
              className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Apply Template
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}