import ClientesForm from '@/components/Forms/clientes/form';
import ListaDePreciosForm from '@/components/Forms/listaDePrecios/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarCliente = () => {
  const location = useLocation();
  const listaPrecioData = location.state;

  return (
    <ContentLayout title="Editar Cliente">
      <h1 className="text-2xl text-left mb-10">
        {listaPrecioData.codLista} - {listaPrecioData.DETALLE}
      </h1>
      <ListaDePreciosForm
        isEdit={true}
        initialValues={{
          codLista: listaPrecioData.codLista,
          DETALLE: listaPrecioData.DETALLE,
        }}
      />
    </ContentLayout>
  );
};

export default EditarCliente;
