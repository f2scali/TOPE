import { Producto } from './producto';

interface ListaPrecios {
  id: number;
  codLista: string;
  DETALLE: string;
}
export interface DetalleLista {
  id: number;
  cod_ListaPrecio: string;
  PRECIO: number;
  producto: Producto;
  listaPrecios: ListaPrecios;
}
