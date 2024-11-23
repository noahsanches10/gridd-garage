import React, { useState, useCallback } from 'react';
import { TILE_WIDTH_INCHES, TILE_HEIGHT_INCHES } from './constants';
import type { TilePosition } from './types';
import TileCalculator from './components/Calculator';
import TileGrid from './components/TileGrid';
import ColorPicker from './components/ColorPicker';
import Summary from './components/Summary';

export default function App() {
  const [dimensions, setDimensions] = useState({ width: 24, length: 24 });
  const [selectedColor, setSelectedColor] = useState<string | null>('#000000');
  const [tilePositions, setTilePositions] = useState<TilePosition[]>(() => {
    const tilesWide = Math.ceil((dimensions.width * 12) / TILE_WIDTH_INCHES);
    const tilesLong = Math.ceil((dimensions.length * 12) / TILE_HEIGHT_INCHES);
    return Array.from({ length: tilesWide * tilesLong }, (_, index) => ({
      x: index % tilesWide,
      y: Math.floor(index / tilesWide),
      color: '#000000'
    }));
  });

  const handleDimensionsChange = (width: number, length: number) => {
    setDimensions({ width, length });
    const tilesWide = Math.ceil((width * 12) / TILE_WIDTH_INCHES);
    const tilesLong = Math.ceil((length * 12) / TILE_HEIGHT_INCHES);
    setTilePositions(Array.from({ length: tilesWide * tilesLong }, (_, index) => ({
      x: index % tilesWide,
      y: Math.floor(index / tilesWide),
      color: '#000000'
    })));
  };

  const handleTileClick = useCallback((x: number, y: number) => {
    setTilePositions(prev => {
      const existingTile = prev.find(tile => tile.x === x && tile.y === y);
      if (!existingTile) {
        return [...prev, { x, y, color: selectedColor || '#000000' }];
      }
      if (selectedColor === null) {
        return prev.map(tile =>
          tile.x === x && tile.y === y
            ? { ...tile, removed: !tile.removed }
            : tile
        );
      }
      return prev.map(tile =>
        tile.x === x && tile.y === y
          ? { ...tile, color: selectedColor, removed: false }
          : tile
      );
    });
  }, [selectedColor]);

  const handleTemplateSelect = useCallback((template: any) => {
    const tilesWide = Math.ceil((dimensions.width * 12) / TILE_WIDTH_INCHES);
    const tilesLong = Math.ceil((dimensions.length * 12) / TILE_HEIGHT_INCHES);
    
    setTilePositions(
      Array.from({ length: tilesWide * tilesLong }, (_, index) => {
        const x = index % tilesWide;
        const y = Math.floor(index / tilesWide);
        return {
          x,
          y,
          color: template.getTileColor(x, y, dimensions.width, dimensions.length)
        };
      })
    );
  }, [dimensions]);

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">GRIDD Garage Floor Designer</h1>
        <p className="text-lg text-gray-600 mt-2">Design your perfect garage floor with our interactive tile customization tool</p>
      </div>
      
      <div className="grid grid-cols-[250px,1fr,250px] gap-3">
        <div className="space-y-3">
          <TileCalculator
            width={dimensions.width}
            length={dimensions.length}
            onDimensionsChange={handleDimensionsChange}
          />
          <ColorPicker
            selectedColor={selectedColor || '#000000'}
            onColorSelect={setSelectedColor}
            onSelectTemplate={handleTemplateSelect}
            isErasing={selectedColor === null}
          />
        </div>

        <div>
          <TileGrid
            width={dimensions.width}
            length={dimensions.length}
            selectedColor={selectedColor}
            tilePositions={tilePositions}
            onTileClick={handleTileClick}
          />
        </div>

        <div>
          <Summary tilePositions={tilePositions} />
        </div>
      </div>
    </div>
  );
}