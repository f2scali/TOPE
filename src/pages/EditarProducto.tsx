import ProductoForm from '@/components/Forms/producto/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarProducto = () => {
  const location = useLocation();
  const productoData = location.state;

  return (
    <ContentLayout title="Editar Producto">
      <h1 className="text-2xl text-left mb-10">{productoData.descripcion}</h1>
      <ProductoForm
        isEdit={true}
        initialValues={{
          id_item: productoData.id_item,
          descripcion: productoData.descripcion,
          id_referencia: productoData.id_referencia,
          id_inventario: productoData.id_inventario?.toString(),
          id_linea: productoData.id_linea?.toString(),
          unimed_inv_1: productoData.unimed_inv_1?.toString(),
          id_cricla1: productoData.id_cricla1?.toString(),
          costo: productoData.costo,
        }}
      />
    </ContentLayout>
  );
};

export default EditarProducto;
