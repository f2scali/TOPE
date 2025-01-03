import DetLineaForm from '@/components/Forms/detLinea/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarDetLinea = () => {
  const location = useLocation();
  const DetLineaData = location.state;

  return (
    <ContentLayout title="Editar DetLinea">
      <h1 className="text-2xl text-left mb-10">
        {DetLineaData.codDetLinea} - {DetLineaData.detalle}
      </h1>
      <DetLineaForm
        isEdit={true}
        initialValues={{
          codDetLinea: DetLineaData.codDetLinea,
          detalle: DetLineaData.detalle,
          id_sublinea: DetLineaData.id_sublinea?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarDetLinea;
