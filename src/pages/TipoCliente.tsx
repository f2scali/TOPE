import { DataTable } from '@/components/core/dataTable/data-table';
import { columns } from '@/components/Tables/clientesTable/tipoCliente/columns';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/tipoCliente/tipoCliente.slice';
import { thunks } from '@/redux/slices/tipoCliente/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TipoClientesForm from '@/components/Forms/tipoClientes/form';
import { BreadCrumbComponent } from '@/components/core/breadcrumb';
import { useLocation } from 'react-router-dom';

const TipoCliente = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [localSearch, setLocalSearch] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { tiposCliente, currentPage, limit, total, totalPages } = useSelector(
    (state: RootState) => state.tipoCliente
  );

  useEffect(() => {
    dispatch(
      thunks.fetchTipoCliente({ currentPage, search: debouncedSearch, limit })
    );
    dispatch(setSearch(debouncedSearch));
  }, [currentPage, debouncedSearch, limit, dispatch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    dispatch(setCurrentPage(1));
  };

  const clearSearch = () => {
    setLocalSearch('');
    dispatch(setSearch(''));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setLimit(limit));
  };
  return (
    <ContentLayout title="Tipo Cliente">
      <BreadCrumbComponent path={pathname} />
      <h1 className="text-3xl text-left mb-4 font-bold">Tipos de Clientes</h1>
      <TipoClientesForm />
      <DataTable
        columns={columns}
        data={tiposCliente}
        search={localSearch}
        handleSearchChange={handleSearchChange}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        limit={limit}
        page={currentPage}
        clearSearch={clearSearch}
        total={total}
        totalPages={totalPages}
      />
    </ContentLayout>
  );
};

export default TipoCliente;
