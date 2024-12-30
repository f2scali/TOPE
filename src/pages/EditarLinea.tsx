import LineasForm from '@/components/Forms/linea/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarLinea = () => {
  const location = useLocation();
  const lineaData = location.state;

  return (
    <ContentLayout title="Editar Linea">
      <h1 className="text-2xl text-left mb-10">
        {lineaData.codLinea} - {lineaData.detalle}
      </h1>
      <LineasForm
        isEdit={true}
        initialValues={{
          detalle: lineaData.detalle,
          id_tipo_inv: lineaData.id_tipo_inv?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarLinea;
