export type TileColor = {
  id: string;
  name: string;
  hex: string;
};

export type GarageSize = {
  width: number;
  length: number;
};

export type TilePosition = {
  x: number;
  y: number;
  color: string;
  removed?: boolean;
};