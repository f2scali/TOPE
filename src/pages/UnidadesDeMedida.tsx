import { DataTable } from '@/components/core/dataTable/data-table';
import { columns } from '@/components/Tables/unidadMedTable/columns';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/unidadMed/unidadMed.slice';
import { thunks } from '@/redux/slices/unidadMed/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnidadMedForm from '@/components/Forms/unidadMed/form';

const UnidadesDeMedida = () => {
  const [localSearch, setLocalSearch] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { unidadMed, currentPage, limit, total, totalPages } = useSelector(
    (state: RootState) => state.unidadMed
  );

  useEffect(() => {
    dispatch(
      thunks.fetchUnidadMed({ currentPage, search: debouncedSearch, limit })
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
    <ContentLayout title="Unidades de Medida">
      <h1 className="text-3xl text-left mb-4 font-bold">Unidades de Medida</h1>
      <UnidadMedForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={columns}
        data={unidadMed}
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

export default UnidadesDeMedida;
