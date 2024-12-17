export interface Rutas {
  id: number;
  descripcion: string;
  path: string;
  subrutas: any[];
}

export interface SubRutas {
  id: number;
  descripcion: string;
}
