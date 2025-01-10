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
import { UnidadMedida } from '@/types/unidadMed';
import DialogCustom from '@/components/core/dialogDelete';

const UnidadesDeMedida = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UnidadMedida | null>(null);
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
  const handleDelete = async (id: number) => {
    try {
      const response = await dispatch(thunks.deleteUnidadMed(id));

      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          thunks.fetchUnidadMed({
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
    <ContentLayout title="Unidades de Medida">
      <h1 className="text-3xl text-left mb-4 font-bold">Unidades de Medida</h1>
      <UnidadMedForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
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

export default UnidadesDeMedida;
