import { Criterio } from './criterio';
import { Inventario } from './inventario';
import { Linea } from './linea';
import { UnidadMedida } from './unidadMed';

export interface Producto {
  id: number;
  id_item: string;
  id_ext_item: string;
  id_inventario: number;
  id_linea: number;
  descripcion: string;
  id_referencia: string;
  unimed_inv_1: number;
  id_cricla1: number;
  costo: string | number;
  estado: number;
  linea: Linea;
  tipoInventario: Inventario;
  unidadMed: UnidadMedida;
  criterio: Criterio;
}
