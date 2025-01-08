import { DataTable } from '@/components/core/dataTable/data-table';
import DetalleListaForm from '@/components/Forms/detalleLista/form';
import { columns } from '@/components/Tables/detalleListaTable/columns';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/detalleLista/detalleLista.slice';
import { thunks } from '@/redux/slices/detalleLista/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { DetalleLista } from '@/types/detalleLista';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DetalleListaPrecio = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DetalleLista | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { detalleListas, currentPage, limit, total, totalPages, error } =
    useSelector((state: RootState) => state.detalleLista);
  useEffect(() => {
    dispatch(
      thunks.fetchDetalleLista({ currentPage, search: debouncedSearch, limit })
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

  const handleDelete = async (
    id: number,
    idProducto?: number,
    idListaPrecio?: number
  ) => {
    try {
      console.log('Eliminando item:', id);
      const response = await dispatch(
        thunks.deleteDetalleLista({ id, idProducto, idListaPrecio })
      );

      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          thunks.fetchDetalleLista({
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
    <ContentLayout title="Detalle de listas">
      <h1 className="text-3xl text-left mb-4 font-bold">Detalle de listas</h1>
      <DetalleListaForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
        data={detalleListas}
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
        <Dialog>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="flex items-center justify-center h-full">
              <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-center">
                  ¿Estás seguro de borrar este registro?
                </h1>
                <DialogFooter>
                  <div className="flex justify-center mx-auto mt-4">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4"
                      onClick={() => {
                        if (selectedItem) {
                          handleDelete(
                            selectedItem.id,
                            selectedItem.producto.id,
                            selectedItem.listaPrecios.id
                          );
                        }
                      }}
                    >
                      Borrar
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </DialogFooter>
                {error && (
                  <small className="text-red-600 text-center mt-6 text-xs">
                    {error}
                  </small>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </ContentLayout>
  );
};

export default DetalleListaPrecio;
