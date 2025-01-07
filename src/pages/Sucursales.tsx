import { BreadCrumbComponent } from '@/components/core/breadcrumb';
import { DataTable } from '@/components/core/dataTable/data-table';
import SucursalForm from '@/components/Forms/sucursal/form';
import { columns } from '@/components/Tables/sucursalTable/columns';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/sucursal/sucursal.slice';
import { thunks } from '@/redux/slices/sucursal/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Sucursales = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const [localSearch, setLocalSearch] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { sucursales, currentPage, limit, total, totalPages } = useSelector(
    (state: RootState) => state.sucursal
  );

  useEffect(() => {
    dispatch(
      thunks.fetchSucursal({ currentPage, search: debouncedSearch, limit })
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
    <ContentLayout title="Sucursales">
      <BreadCrumbComponent path={pathName} />
      <h1 className="text-3xl text-left mb-4 font-bold">Sucursales</h1>
      <SucursalForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={columns}
        data={sucursales}
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

export default Sucursales;
