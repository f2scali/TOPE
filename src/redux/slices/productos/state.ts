import { Producto } from '../../../types/producto';

interface ProductoState {
  productos: Producto[];
  loading: boolean;
  error: null | string;
  totalPages: number;
  currentPage: number;
  search: string;
}
const initialState: ProductoState = {
  productos: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  search: '',
};

export default initialState;
