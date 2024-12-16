import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { AppDispatch, RootState } from './redux/store/store';
import { thunks } from './redux/slices/productos/thunks';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  setCurrentPage,
  setSearch,
} from './redux/slices/productos/producto.slice';
import AppRouter from './routes/routes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { productos, loading, currentPage, search, limit, totalPages } =
    useSelector((state: RootState) => state.productos);

  useEffect(() => {
    dispatch(thunks.fetchProductos({ currentPage, search, limit }));
  }, [search, currentPage, limit]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      {/* <div>
        <h1>Productos</h1>
        <input
          type="text"
          placeholder="Buscar productos"
          value={search}
          onChange={handleSearchChange}
          autoFocus
        />
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.ID}>
                  <td>{producto.ID}</td>
                  <td>{producto.DESCRIPCION}</td>
                  <td>{producto.COSTO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>

          <button
            disabled={currentPage === totalPages || loading}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
        <p>{totalPages} productos</p>
      </div> */}
      <AppRouter isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
