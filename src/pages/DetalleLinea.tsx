import { DataTable } from '@/components/core/dataTable/data-table';
import { columns } from '@/components/Tables/detalleLIneaTable/columns';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/sublinea/sublinea.slice';
import { thunks } from '@/redux/slices/detalleLinea/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetLineaForm from '@/components/Forms/detLinea/form';
import { DetalleLinea as DetalleLineaType } from '@/types/detalleLinea';
import DialogCustom from '@/components/core/dialogDelete';

const DetalleLinea = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DetalleLineaType | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { detalleLineas, currentPage, limit, total, totalPages } = useSelector(
    (state: RootState) => state.detalleLineas
  );

  useEffect(() => {
    dispatch(
      thunks.fetchDetalleLineas({ currentPage, search: debouncedSearch, limit })
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
      console.log('Eliminando item:', id);
      const response = await dispatch(thunks.deleteDetalleLinea(id));

      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          thunks.fetchDetalleLineas({
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
    <ContentLayout title="Detalle de lineas">
      <h1 className="text-3xl text-left mb-4 font-bold">Detalle de lineas</h1>
      <DetLineaForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
        data={detalleLineas}
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

export default DetalleLinea;
