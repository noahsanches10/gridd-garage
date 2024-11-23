export const TILE_COLORS = [
  { id: '1', name: 'Black', hex: '#000000' },
  { id: '2', name: 'White', hex: '#FFFFFF' },
  { id: '3', name: 'Green', hex: '#34BC51' },
  { id: '4', name: 'Pink', hex: '#F73E72' },
  { id: '5', name: 'Red', hex: '#DB2921' },
  { id: '6', name: 'Orange', hex: '#F06E26' },
  { id: '7', name: 'Yellow', hex: '#FCCB15' },
  { id: '8', name: 'Purple', hex: '#8F3C6D' },
  { id: '9', name: 'Dark Blue', hex: '#031356' },
  { id: '10', name: 'Teal', hex: '#A5E3E8' },
  { id: '11', name: 'Light Blue', hex: '#079AD3' },
  { id: '12', name: 'Blue', hex: '#104690' },
  { id: '13', name: 'Lime', hex: '#D4E311' },
  { id: '14', name: 'Peach', hex: '#F5D3AC' },
  { id: '15', name: 'Dark Grey', hex: '#585654' },
  { id: '16', name: 'Grey', hex: '#96948E' }
];

export const FLOOR_TEMPLATES = [
  {
    id: 'solid',
    name: 'Solid Color',
    description: 'Classic single color design',
    getTileColor: (x: number, y: number, width: number, length: number) => '#000000'
  },
  {
    id: 'border',
    name: 'Border Design',
    description: 'Main color with contrasting border',
    getTileColor: (x: number, y: number, width: number, length: number) => {
      const tilesWide = Math.ceil((width * 12) / 15.7);
      const tilesLong = Math.ceil((length * 12) / 15.75);
      return (x === 0 || y === 0 || x === tilesWide - 1 || y === tilesLong - 1) ? '#DB2921' : '#000000';
    }
  },
  {
    id: 'inner-border',
    name: 'Inner Border',
    description: 'Accent color on second row from edge',
    getTileColor: (x: number, y: number, width: number, length: number) => {
      const tilesWide = Math.ceil((width * 12) / 15.7);
      const tilesLong = Math.ceil((length * 12) / 15.75);
      return (x === 1 || y === 1 || x === tilesWide - 2 || y === tilesLong - 2) ? '#DB2921' : '#000000';
    }
  },
  {
    id: 'double-border',
    name: 'Double Border',
    description: 'Main color with double border accent',
    getTileColor: (x: number, y: number, width: number, length: number) => {
      const tilesWide = Math.ceil((width * 12) / 15.7);
      const tilesLong = Math.ceil((length * 12) / 15.75);
      return (x <= 1 || y <= 1 || x >= tilesWide - 2 || y >= tilesLong - 2) ? '#DB2921' : '#000000';
    }
  },
  {
    id: 'checkerboard',
    name: 'Checkerboard',
    description: 'Alternating two-color pattern',
    getTileColor: (x: number, y: number) => (x + y) % 2 === 0 ? '#000000' : '#96948E'
  }
];

export const TILE_WIDTH_INCHES = 15.7;
export const TILE_HEIGHT_INCHES = 15.75;
export const TILES_PER_CASE = 25;
export const SQFT_PER_CASE = 43;
export const WASTE_FACTOR = 0.15; // 15% extra for cuts