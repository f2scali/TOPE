import { DataTable } from '@/components/core/dataTable/data-table';
import DialogCustom from '@/components/core/dialogDelete';
import ListaDePreciosForm from '@/components/Forms/listaDePrecios/form';
import { columns } from '@/components/Tables/listaDePreciosTable/colums';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/listaPrecios/listaPrecios.slice';
import { thunks } from '@/redux/slices/listaPrecios/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { ListaPrecio } from '@/types/listaPrecio';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ListaDePrecios = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListaPrecio | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { listaPrecios, currentPage, limit, total, totalPages } = useSelector(
    (state: RootState) => state.listaPrecios
  );

  useEffect(() => {
    dispatch(
      thunks.fetchListaPrecios({ currentPage, search: debouncedSearch, limit })
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
      const response = await dispatch(thunks.deleteListaPrecios(id));

      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          thunks.fetchListaPrecios({
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
    <ContentLayout title="Lista de precios">
      <h1 className="text-3xl text-left mb-4 font-bold">Lista de precios</h1>
      <ListaDePreciosForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
        data={listaPrecios}
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

export default ListaDePrecios;
