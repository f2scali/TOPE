import { Inventario } from './inventario';

export interface Linea {
  id: number;
  codLinea: string;
  detalle: string;
  tipoInventario: Inventario;
}
