import { DataTable } from '@/components/core/dataTable/data-table';
import DialogCustom from '@/components/core/dialogDelete';
import TipoInventarioForm from '@/components/Forms/tipoInventario/form';
import { columns } from '@/components/Tables/InventarioTable/columns';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/inventario/inventario.slice';
import { thunks } from '@/redux/slices/inventario/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { Inventario as InventarioType } from '@/types/inventario';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Inventario = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventarioType | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { inventario, currentPage, limit, totalPages, total } = useSelector(
    (state: RootState) => state.inventario
  );

  useEffect(() => {
    dispatch(
      thunks.fetchInventario({ currentPage, search: debouncedSearch, limit })
    );
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, currentPage, limit, dispatch]);

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
      const response = await dispatch(thunks.deleteTipoInventario(id));

      if (response.meta.requestStatus === 'fulfilled') {
        // Si el delete es exitoso, hacer fetch de nuevo
        await dispatch(
          thunks.fetchInventario({
            currentPage,
            search: debouncedSearch,
            limit,
          })
        );
        setOpenDialog(false); // Cerrar el modal
      } else {
        console.error('Error eliminando el item:', response.payload);
      }
    } catch (error) {
      console.error('Error eliminando el item:', error);
    }
  };
  const tableColumns = columns({
    openDialog,
    setOpenDialog,
    setSelectedItem,
  });

  return (
    <ContentLayout title="Inventario">
      <h1 className="text-3xl text-left mb-4 font-bold">Inventario</h1>
      <TipoInventarioForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
        data={inventario}
        search={localSearch}
        handleSearchChange={handleSearchChange}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        limit={limit}
        page={currentPage}
        total={total}
        totalPages={totalPages}
        clearSearch={clearSearch}
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

export default Inventario;
