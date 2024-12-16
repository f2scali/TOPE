import { Rutas } from '../../../types/rutas';

export interface RutasState {
  rutas: Rutas[];
  loading: boolean;
  error: null | string;
}
const initialState: RutasState = {
  rutas: [],
  loading: false,
  error: null,
};

export default initialState;
