import { Inventario } from './inventario';

export interface UnidadMedida {
  id: number;
  codUnidadMed: string;
  Detalle: string;
  tipoInventario: Inventario;
}
