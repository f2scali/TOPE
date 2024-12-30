import UnidadMedForm from '@/components/Forms/unidadMed/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarUnidadMed = () => {
  const location = useLocation();
  const UnidadMedData = location.state;

  return (
    <ContentLayout title="Editar unidad de medida">
      <h1 className="text-2xl text-left mb-10">
        {UnidadMedData.codUnidadMed} - {UnidadMedData.Detalle}
      </h1>
      <UnidadMedForm
        isEdit={true}
        initialValues={{
          codUnidadMed: UnidadMedData.codUnidadMed,
          Detalle: UnidadMedData.Detalle,
          id_tipo_inv: UnidadMedData.id_tipo_inv?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarUnidadMed;
