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
  id_referencia: number;
  unimed_inv_1: string;
  id_cricla1: string;
  costo: number;
  estado: number;
  linea: Linea;
  tipoInventario: Inventario;
  unidadMed: UnidadMedida;
  criterio: Criterio;
}
