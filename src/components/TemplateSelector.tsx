import React from 'react';
import { Layout, PaintBucket } from 'lucide-react';
import { FLOOR_TEMPLATES, TILE_COLORS } from '../constants';

interface TemplateSelectorProps {
  onSelectTemplate: (template: typeof FLOOR_TEMPLATES[0]) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = React.useState(FLOOR_TEMPLATES[0]);
  const [primaryColor, setPrimaryColor] = React.useState('#000000');
  const [secondaryColor, setSecondaryColor] = React.useState('#DB2921');

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
              ? secondaryColor : primaryColor;
          case 'double-border':
            return (x <= 1 || y <= 1 || x >= tilesWide - 2 || y >= tilesLong - 2) 
              ? secondaryColor : primaryColor;
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
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Layout className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold">Starting Templates</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {FLOOR_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className={`p-2.5 border-2 rounded-lg text-left transition-colors ${
              selectedTemplate.id === template.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <h3 className="text-sm font-semibold text-gray-900">{template.name}</h3>
            <p className="text-xs text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>

      <div className="space-y-2 mb-3">
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <PaintBucket className="w-4 h-4" />
            Primary Color
          </label>
          <div className="grid grid-cols-8 gap-1 mt-1">
            {TILE_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setPrimaryColor(color.hex)}
                className={`aspect-square rounded-md border ${
                  primaryColor === color.hex ? 'border-blue-500 scale-105' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {selectedTemplate.id !== 'solid' && (
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <PaintBucket className="w-4 h-4" />
              Secondary Color
            </label>
            <div className="grid grid-cols-8 gap-1 mt-1">
              {TILE_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSecondaryColor(color.hex)}
                  className={`aspect-square rounded-md border ${
                    secondaryColor === color.hex ? 'border-blue-500 scale-105' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleApplyTemplate}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Apply Template
      </button>
    </div>
  );
}