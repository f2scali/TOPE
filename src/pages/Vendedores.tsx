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
import { Vendedor } from '@/types/vendedor';
import DialogCustom from '@/components/core/dialogDelete';

const Vendedores = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Vendedor | null>(null);
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

  const handleDelete = async (id: number) => {
    try {
      console.log('Eliminando item:', id);
      const response = await dispatch(thunks.deleteVendedor(id));

      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          thunks.fetchVendedores({
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
    <ContentLayout title="Vendedores">
      <h1 className="text-3xl text-left mb-4 font-bold">
        Administrar Vendedores
      </h1>
      <VendedorForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
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

export default Vendedores;
