import { DataTable } from '@/components/core/dataTable/data-table';
import { columns } from '@/components/Tables/clientesTable/columns';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/clientes/clientes.slice';
import { thunks } from '@/redux/slices/clientes/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Clientes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { clientes, currentPage, error, limit, loading, search, totalPages } =
    useSelector((state: RootState) => state.clientes);

  useEffect(() => {
    dispatch(thunks.fetchClientes({ currentPage, search, limit }));
  }, [currentPage, search, limit, dispatch]);

  console.log(search, 'buscador');
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const clearSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSearch(''));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setLimit(limit));
  };
  return (
    <ContentLayout title="Clientes">
      <h1 className="text-3xl text-left mb-4 font-bold">Clientes</h1>
      <DataTable
        columns={columns}
        data={clientes}
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

export default Clientes;
