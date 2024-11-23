import React, { useCallback, useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TILE_WIDTH_INCHES, TILE_HEIGHT_INCHES } from '../constants';
import { TilePosition } from '../types';

interface TileGridProps {
  width: number;
  length: number;
  selectedColor: string | null;
  tilePositions: TilePosition[];
  onTileClick: (x: number, y: number) => void;
}

export default function TileGrid({ width, length, selectedColor, tilePositions, onTileClick }: TileGridProps) {
  const [zoom, setZoom] = useState(1);
  const tilesWide = Math.ceil((width * 12) / TILE_WIDTH_INCHES);
  const tilesLong = Math.ceil((length * 12) / TILE_HEIGHT_INCHES);

  // Calculate initial zoom to fit the entire grid
  useEffect(() => {
    const containerWidth = 800; // Max container width
    const containerHeight = 600; // Max container height
    const idealTileSize = Math.min(
      containerWidth / tilesWide,
      containerHeight / tilesLong
    );
    const initialZoom = Math.max(0.1, Math.min(1, idealTileSize / 20)); // 20px is our base tile size
    setZoom(initialZoom);
  }, [tilesWide, tilesLong]);

  const getTileColor = useCallback((x: number, y: number) => {
    const tile = tilePositions.find(tile => tile.x === x && tile.y === y);
    if (!tile || tile.removed) return '#e5e7eb';
    return tile.color;
  }, [tilePositions]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.1));
  const handleResetZoom = () => {
    const idealTileSize = Math.min(800 / tilesWide, 600 / tilesLong);
    setZoom(Math.max(0.1, Math.min(1, idealTileSize / 20)));
  };

  // Use a smaller base tile size
  const baseTileSize = 20; // Fixed base size for consistency

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Garage Floor Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        className="relative overflow-auto border border-gray-200 rounded-lg"
        style={{ 
          height: '60vh',
          maxWidth: '100%'
        }}
      >
        <div 
          className="grid gap-px transition-transform duration-200 bg-gray-100"
          style={{ 
            gridTemplateColumns: `repeat(${tilesWide}, ${baseTileSize}px)`,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            width: `${tilesWide * baseTileSize}px`,
            height: `${tilesLong * baseTileSize}px`
          }}
        >
          {Array.from({ length: tilesLong * tilesWide }).map((_, index) => {
            const x = index % tilesWide;
            const y = Math.floor(index / tilesWide);
            const tile = tilePositions.find(t => t.x === x && t.y === y);
            return (
              <div
                key={`${x}-${y}`}
                className="cursor-pointer hover:opacity-90 transition-opacity relative"
                style={{ 
                  backgroundColor: getTileColor(x, y),
                  width: `${baseTileSize}px`,
                  height: `${baseTileSize}px`
                }}
                onClick={() => onTileClick(x, y)}
              >
                {tile?.removed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-red-500 rotate-45 transform origin-center" />
                    <div className="w-full h-0.5 bg-red-500 -rotate-45 transform origin-center absolute" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Grid Size: {tilesWide} × {tilesLong} tiles</span>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
}