import { DataTable } from '@/components/core/dataTable/data-table';
import DialogCustom from '@/components/core/dialogDelete';
import CriterioForm from '@/components/Forms/criterio/form';
import { columns } from '@/components/Tables/criterioTable/column';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/criterios/criterios.slice';
import { thunks } from '@/redux/slices/criterios/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { Criterio } from '@/types/criterio';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CriterioProductos = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Criterio | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { criterios, currentPage, limit, total, totalPages } = useSelector(
    (state: RootState) => state.criterios
  );

  useEffect(() => {
    dispatch(
      thunks.fetchCriterios({ currentPage, search: debouncedSearch, limit })
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

  const handleDelete = async (id: number) => {
    try {
      const response = await dispatch(thunks.deleteCriterios(id));

      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          thunks.fetchCriterios({
            currentPage,
            search: debouncedSearch,
            limit,
          })
        );
        setOpenDialog(false);
      } else {
        console.error('Error eliminando el item:', response.payload);
      }
    } catch (error) {
      console.error('Error eliminando el item:', error);
    }
  };
  const tableColumns = columns({
    setOpenDialog,
    setSelectedItem,
  });
  return (
    <ContentLayout title="Criterios">
      <h1 className="text-3xl text-left mb-4 font-bold">
        Criterios para productos
      </h1>
      <CriterioForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
        data={criterios}
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

      {openDialog && (
        <DialogCustom
          handleDelete={handleDelete}
          setOpenDialog={setOpenDialog}
          selectedItem={selectedItem}
        />
      )}
    </ContentLayout>
  );
};
export default CriterioProductos;
