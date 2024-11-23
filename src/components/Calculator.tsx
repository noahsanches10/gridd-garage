import React from 'react';
import { Calculator } from 'lucide-react';
import { WASTE_FACTOR, SQFT_PER_CASE } from '../constants';

interface CalculatorProps {
  width: number;
  length: number;
  onDimensionsChange: (width: number, length: number) => void;
}

export default function TileCalculator({ width, length, onDimensionsChange }: CalculatorProps) {
  const sqft = width * length;
  const casesNeeded = Math.ceil((sqft * (1 + WASTE_FACTOR)) / SQFT_PER_CASE);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold">Tile Calculator</h2>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Width (ft)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => onDimensionsChange(Number(e.target.value), length)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Length (ft)</label>
            <input
              type="number"
              value={length}
              onChange={(e) => onDimensionsChange(width, Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-600">Total Area</p>
              <p className="text-base font-semibold">{sqft} sq ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Case #</p>
              <p className="text-base font-semibold">{casesNeeded} cases</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Includes {Math.round(WASTE_FACTOR * 100)}% extra for cuts
          </p>
        </div>
      </div>
    </div>
  );
}