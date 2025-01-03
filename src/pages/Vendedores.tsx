import { DataTable } from '@/components/core/dataTable/data-table';
import { columns } from '@/components/Tables/usuariosTable/vendedores/columns';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/vendedor/vendedor.slice';
import { thunks } from '@/redux/slices/vendedor/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VendedorForm from '@/components/Forms/vendedor/form';

const Vendedores = () => {
  const [localSearch, setLocalSearch] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { vendedores, currentPage, limit, total, totalPages } = useSelector(
    (state: RootState) => state.vendedores
  );

  useEffect(() => {
    dispatch(
      thunks.fetchVendedores({ currentPage, search: debouncedSearch, limit })
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
    <ContentLayout title="Vendedores">
      <h1 className="text-3xl text-left mb-4 font-bold">
        Administrar Vendedores
      </h1>
      <VendedorForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={columns}
        data={vendedores}
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

export default Vendedores;
