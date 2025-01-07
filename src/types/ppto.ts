import { Vendedor } from './vendedor';

export interface Ppto {
  id: number;
  id_Vendedor: number;
  Año: string;
  Mes: string;
  Cuota: string;
  Ventas: string;
  vendedor: Vendedor;
}
