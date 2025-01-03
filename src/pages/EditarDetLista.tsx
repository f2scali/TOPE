import DetalleListaForm from '@/components/Forms/detalleLista/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarDetLista = () => {
  const location = useLocation();
  const DetListaData = location.state;

  return (
    <ContentLayout title="Editar DetLista">
      <h1 className="text-2xl text-left mb-10">
        {DetListaData.cod_ListaPrecio}
      </h1>
      <DetalleListaForm
        isEdit={true}
        initialValues={{
          cod_ListaPrecio: DetListaData.cod_ListaPrecio,
          PRECIO: DetListaData.PRECIO,
          id_producto: DetListaData.id_producto?.toString(),
          idListaPrecio: DetListaData.idListaPrecio?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarDetLista;
