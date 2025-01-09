import { Inventario } from './inventario';

export interface Linea {
  id: number;
  codLinea: string | null;
  detalle: string;
  tipoInventario: Inventario;
}
