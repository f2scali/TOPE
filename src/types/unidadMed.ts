import { Inventario } from './inventario';

export interface UnidadMedida {
  id: number;
  codUnidadMed: string | null;
  Detalle: string;
  tipoInventario: Inventario;
}
