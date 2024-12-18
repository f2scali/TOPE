import { DataTable } from '@/components/core/dataTable/data-table';
import { columns } from '@/components/productosTable/columns';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
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
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(thunks.fetchProductos({ currentPage: 1, search, limit }));
    dispatch(setCurrentPage(1));
    dispatch(setSearch(e.target.value));
  };

  const clearSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSearch(''));
    dispatch(thunks.fetchProductos({ currentPage: 1, search: '', limit }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(thunks.fetchProductos({ currentPage: page, search, limit }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(thunks.fetchProductos({ currentPage: 1, search, limit }));
    dispatch(setCurrentPage(1));
    dispatch(setLimit(limit));
  };

  return (
    <ContentLayout title="Productos">
      <h1 className="text-3xl text-left mb-4 font-bold">Productos</h1>

      <DataTable
        columns={columns}
        data={productos}
        search={search}
        handleSearchChange={handleSearchChange}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        limit={limit}
        page={currentPage}
        clearSearch={clearSearch}
      />
    </ContentLayout>
  );
};

export default Productos;
