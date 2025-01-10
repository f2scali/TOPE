import { BreadCrumbComponent } from '@/components/core/breadcrumb';
import { DataTable } from '@/components/core/dataTable/data-table';
import DialogCustom from '@/components/core/dialogDelete';
import ProductoForm from '@/components/Forms/producto/form';
import { columns } from '@/components/Tables/productosTable/columns';
import { useDebounce } from '@/hooks/useDebounce';
import { ContentLayout } from '@/layout/Content-layout';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/productos/producto.slice';
import { thunks } from '@/redux/slices/productos/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { Producto } from '@/types/producto';

import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Productos = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const [localSearch, setLocalSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Producto | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = useDebounce(localSearch, 300);
  const { productos, currentPage, limit, totalPages, total } = useSelector(
    (state: RootState) => state.productos
  );

  useEffect(() => {
    dispatch(
      thunks.fetchProductos({ currentPage, search: debouncedSearch, limit })
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
      const response = await dispatch(thunks.deleteProducto(id));

      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          thunks.fetchProductos({
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
    <ContentLayout title="Productos">
      <BreadCrumbComponent path={pathName} />
      <h1 className="text-3xl text-left mb-4 font-bold">Productos</h1>
      <ProductoForm setLocalSearch={setLocalSearch} />
      <DataTable
        columns={tableColumns}
        data={productos}
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

export default Productos;
