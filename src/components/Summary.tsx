import React, { useMemo } from 'react';
import { ClipboardList } from 'lucide-react';
import { TILE_COLORS, TILES_PER_CASE } from '../constants';
import { TilePosition } from '../types';

interface SummaryProps {
  tilePositions: TilePosition[];
}

export default function Summary({ tilePositions }: SummaryProps) {
  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tilePositions.forEach(tile => {
      if (!tile.removed) {
        counts[tile.color] = (counts[tile.color] || 0) + 1;
      }
    });
    return counts;
  }, [tilePositions]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Order Summary</h2>
      </div>

      <div className="space-y-2">
        {Object.entries(colorCounts).map(([color, count]) => {
          const colorInfo = TILE_COLORS.find(c => c.hex === color);
          const casesNeeded = Math.ceil(count / TILES_PER_CASE);
          
          if (!colorInfo) return null;

          return (
            <div key={color} className="flex items-center justify-between p-2 rounded bg-gray-50">
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-200" 
                  style={{ backgroundColor: color }}
                />
                <span>{colorInfo.name}</span>
              </div>
              <div className="text-sm whitespace-nowrap">
                <span className="font-medium">{casesNeeded}c</span>
                <span className="text-gray-500 ml-1">({count}t)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}