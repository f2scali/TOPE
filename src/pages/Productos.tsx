import {
  setCurrentPage,
  setSearch,
} from '@/redux/slices/productos/producto.slice';
import { thunks } from '@/redux/slices/productos/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';

import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Productos = () => {
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
  console.log('productos', productos);
  return (
    <div className="h-screen flex flex-col">
      <input
        type="text"
        className="text-white"
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
              <th>CODIGO</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  {`${producto.id_item}${
                    producto.id_ext_item ? `-${producto.id_ext_item}` : ''
                  }`}
                </td>
                <td>{producto.descripcion}</td>
                <td>{producto.costo}</td>
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
    </div>
  );
};

export default Productos;
