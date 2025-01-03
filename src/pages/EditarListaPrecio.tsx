import ListaDePreciosForm from '@/components/Forms/listaDePrecios/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarLista = () => {
  const location = useLocation();
  const listaPrecioData = location.state;

  return (
    <ContentLayout title="Editar Lista">
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

export default EditarLista;
